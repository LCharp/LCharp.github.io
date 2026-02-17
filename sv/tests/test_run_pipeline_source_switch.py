import os
import sys
import tempfile
import types
import unittest
from typing import Optional
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


class RunPipelineSourceSwitchTests(unittest.TestCase):
    def _run_pipeline_with_mocks(self, source: str, previous_source: Optional[str]) -> mock.Mock:
        with (
            mock.patch("run_pipeline.load_config", return_value={"source": source}),
            mock.patch("run_pipeline._load_last_source", return_value=previous_source),
            mock.patch("run_pipeline._reset_for_source_switch") as reset_mock,
            mock.patch("run_pipeline._sync_for_source", return_value={"ok": True}),
            mock.patch("run_pipeline.normalize_func", return_value=[]),
            mock.patch("run_pipeline._write_normalized"),
            mock.patch("run_pipeline.aggregate_func", return_value={}),
            mock.patch("run_pipeline._write_aggregates"),
            mock.patch("run_pipeline.generate_heatmaps"),
            mock.patch("run_pipeline._persist_source"),
            mock.patch("run_pipeline._update_readme_live_site_link"),
        ):
            run_pipeline.run_pipeline(
                skip_sync=False,
                dry_run=False,
                prune_deleted=False,
                update_readme_link=False,
            )
            return reset_mock

    def test_run_pipeline_resets_when_source_changes(self) -> None:
        reset_mock = self._run_pipeline_with_mocks(source="garmin", previous_source="strava")
        reset_mock.assert_called_once()

    def test_run_pipeline_does_not_reset_when_source_is_unchanged(self) -> None:
        reset_mock = self._run_pipeline_with_mocks(source="strava", previous_source="strava")
        reset_mock.assert_not_called()

    def test_run_pipeline_resets_when_missing_source_marker_conflicts_with_persisted_hint(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            data_dir = os.path.join(tmpdir, "data")
            os.makedirs(data_dir, exist_ok=True)
            with open(os.path.join(data_dir, "activities_normalized.json"), "w", encoding="utf-8") as f:
                f.write("[]\n")
            with open(os.path.join(data_dir, "backfill_state_garmin.json"), "w", encoding="utf-8") as f:
                f.write("{}\n")

            previous_cwd = os.getcwd()
            os.chdir(tmpdir)
            try:
                reset_mock = self._run_pipeline_with_mocks(source="strava", previous_source=None)
            finally:
                os.chdir(previous_cwd)

        reset_mock.assert_called_once()

    def test_run_pipeline_does_not_reset_for_missing_marker_with_no_hint_and_default_source(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            data_dir = os.path.join(tmpdir, "data")
            os.makedirs(data_dir, exist_ok=True)
            with open(os.path.join(data_dir, "activities_normalized.json"), "w", encoding="utf-8") as f:
                f.write("[]\n")

            previous_cwd = os.getcwd()
            os.chdir(tmpdir)
            try:
                reset_mock = self._run_pipeline_with_mocks(source="strava", previous_source=None)
            finally:
                os.chdir(previous_cwd)

        reset_mock.assert_not_called()


if __name__ == "__main__":
    unittest.main()
