import os
import sys
import tempfile
import types
import unittest
from unittest import mock


ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SCRIPTS_DIR = os.path.join(ROOT_DIR, "scripts")
if SCRIPTS_DIR not in sys.path:
    sys.path.insert(0, SCRIPTS_DIR)

yaml_stub = types.ModuleType("yaml")
yaml_stub.safe_load = lambda *_args, **_kwargs: {}
sys.modules.setdefault("yaml", yaml_stub)

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

import run_pipeline  # noqa: E402


class _FakeUrlOpenResponse:
    def __init__(self, payload: str) -> None:
        self._payload = payload.encode("utf-8")

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return False

    def read(self) -> bytes:
        return self._payload


class RunPipelineReadmeLinkTests(unittest.TestCase):
    def test_repo_slug_prefers_dashboard_repo_env(self) -> None:
        with mock.patch.dict(
            os.environ,
            {"DASHBOARD_REPO": "owner/custom-fork", "GITHUB_REPOSITORY": "owner/git-sweaty"},
            clear=False,
        ):
            self.assertEqual(run_pipeline._repo_slug_from_git(), "owner/custom-fork")

    def test_dashboard_url_from_pages_api_prefers_cname(self) -> None:
        with (
            mock.patch.dict(os.environ, {"GITHUB_TOKEN": "token-abc"}, clear=False),
            mock.patch(
                "run_pipeline.urllib.request.urlopen",
                return_value=_FakeUrlOpenResponse(
                    '{"cname":"strava.nedevski.com","html_url":"https://nedevski.github.io/strava/"}'
                ),
            ),
        ):
            result = run_pipeline._dashboard_url_from_pages_api("nedevski/strava")
        self.assertEqual(result, "https://strava.nedevski.com/")

    def test_dashboard_url_from_pages_api_falls_back_to_html_url(self) -> None:
        with (
            mock.patch.dict(os.environ, {"GITHUB_TOKEN": "token-abc"}, clear=False),
            mock.patch(
                "run_pipeline.urllib.request.urlopen",
                return_value=_FakeUrlOpenResponse(
                    '{"cname":"","html_url":"https://nedevski.github.io/strava/"}'
                ),
            ),
        ):
            result = run_pipeline._dashboard_url_from_pages_api("nedevski/strava")
        self.assertEqual(result, "https://nedevski.github.io/strava/")

    def test_update_readme_live_site_link_prefers_custom_domain(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            readme_path = os.path.join(tmpdir, "README.md")
            with open(readme_path, "w", encoding="utf-8") as handle:
                handle.write(
                    "# Test\n"
                    "- View the Interactive [Activity Dashboard](https://nedevski.github.io/strava/)\n"
                )

            previous_cwd = os.getcwd()
            os.chdir(tmpdir)
            try:
                with (
                    mock.patch("run_pipeline._repo_slug_from_git", return_value="nedevski/strava"),
                    mock.patch(
                        "run_pipeline._dashboard_url_from_pages_api",
                        return_value="https://strava.nedevski.com/",
                    ),
                ):
                    run_pipeline._update_readme_live_site_link()
            finally:
                os.chdir(previous_cwd)

            with open(readme_path, "r", encoding="utf-8") as handle:
                updated = handle.read()
            self.assertIn(
                "- View the Interactive [Activity Dashboard](https://strava.nedevski.com/)",
                updated,
            )

    def test_update_readme_live_site_link_falls_back_to_pages_url(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            readme_path = os.path.join(tmpdir, "README.md")
            with open(readme_path, "w", encoding="utf-8") as handle:
                handle.write(
                    "# Test\n"
                    "- View the Interactive [Activity Dashboard](https://example.com/old)\n"
                )

            previous_cwd = os.getcwd()
            os.chdir(tmpdir)
            try:
                with (
                    mock.patch("run_pipeline._repo_slug_from_git", return_value="nedevski/strava"),
                    mock.patch("run_pipeline._dashboard_url_from_pages_api", return_value=None),
                ):
                    run_pipeline._update_readme_live_site_link()
            finally:
                os.chdir(previous_cwd)

            with open(readme_path, "r", encoding="utf-8") as handle:
                updated = handle.read()
            self.assertIn(
                "- View the Interactive [Activity Dashboard](https://nedevski.github.io/strava/)",
                updated,
            )


if __name__ == "__main__":
    unittest.main()
