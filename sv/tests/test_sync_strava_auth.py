import os
import sys
import tempfile
import types
import unittest
from datetime import datetime, timezone
from unittest import mock


ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SCRIPTS_DIR = os.path.join(ROOT_DIR, "scripts")
if SCRIPTS_DIR not in sys.path:
    sys.path.insert(0, SCRIPTS_DIR)


requests_stub = types.ModuleType("requests")


class _RequestException(Exception):
    pass


class _HTTPError(_RequestException):
    def __init__(self, message: str, response=None):
        super().__init__(message)
        self.response = response


def _default_request(*_args, **_kwargs):
    raise NotImplementedError("requests.request stub was not patched")


requests_stub.RequestException = _RequestException
requests_stub.HTTPError = _HTTPError
requests_stub.request = _default_request
sys.modules.setdefault("requests", requests_stub)

yaml_stub = types.ModuleType("yaml")
yaml_stub.safe_load = lambda *_args, **_kwargs: {}
sys.modules.setdefault("yaml", yaml_stub)

import sync_strava  # noqa: E402


class _MockResponse:
    def __init__(self, status_code: int, payload: dict | None = None, headers: dict | None = None):
        self.status_code = status_code
        self._payload = payload or {}
        self.headers = headers or {}

    def raise_for_status(self) -> None:
        if self.status_code >= 400:
            raise sync_strava.requests.HTTPError(f"{self.status_code} error", response=self)

    def json(self) -> dict:
        return self._payload


class SyncStravaAuthTests(unittest.TestCase):
    def test_request_json_with_retry_non_transient_http_fails_fast(self) -> None:
        response = _MockResponse(400, {"message": "Bad Request"})
        with mock.patch("sync_strava.requests.request", return_value=response) as request_mock:
            with self.assertRaises(sync_strava.requests.HTTPError):
                sync_strava._request_json_with_retry(
                    "POST",
                    "https://www.strava.com/oauth/token",
                    limiter=None,
                    request_kind="overall",
                )
        self.assertEqual(request_mock.call_count, 1)

    def test_get_access_token_falls_back_to_configured_refresh_token(self) -> None:
        config = {
            "strava": {
                "client_id": "id",
                "client_secret": "secret",
                "refresh_token": "configured-token",
            }
        }
        cache = {
            "access_token": "expired-token",
            "expires_at": 0,
            "refresh_token": "cached-stale-token",
        }
        calls: list[str] = []

        def _fake_request(_method: str, _url: str, **kwargs):
            candidate = kwargs["data"]["refresh_token"]
            calls.append(candidate)
            if candidate == "cached-stale-token":
                raise sync_strava.requests.HTTPError("400", response=_MockResponse(400))
            return {
                "access_token": "fresh-access",
                "expires_at": 9999999999,
                "refresh_token": "rotated-token",
            }

        saved_payloads: list[dict] = []
        with (
            mock.patch("sync_strava._load_token_cache", return_value=cache),
            mock.patch("sync_strava._request_json_with_retry", side_effect=_fake_request),
            mock.patch("sync_strava._save_token_cache", side_effect=lambda payload: saved_payloads.append(payload)),
            mock.patch("builtins.print"),
            mock.patch(
                "sync_strava.utc_now",
                return_value=datetime(2026, 2, 13, tzinfo=timezone.utc),
            ),
        ):
            token = sync_strava._get_access_token(config, limiter=None)

        self.assertEqual(token, "fresh-access")
        self.assertEqual(calls, ["cached-stale-token", "configured-token"])
        self.assertEqual(saved_payloads[0]["refresh_token"], "rotated-token")

    def test_save_token_cache_persists_refresh_token(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            token_cache = os.path.join(tmpdir, ".strava_token.json")
            with mock.patch("sync_strava.TOKEN_CACHE", token_cache):
                sync_strava._save_token_cache(
                    {
                        "access_token": "a",
                        "expires_at": 123,
                        "refresh_token": "r",
                    }
                )

                payload = sync_strava._load_token_cache()
                self.assertEqual(payload.get("refresh_token"), "r")


if __name__ == "__main__":
    unittest.main()
