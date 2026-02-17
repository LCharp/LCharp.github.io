import os
import sys
import types
import unittest
from datetime import datetime, timezone
from unittest import mock


ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SCRIPTS_DIR = os.path.join(ROOT_DIR, "scripts")
if SCRIPTS_DIR not in sys.path:
    sys.path.insert(0, SCRIPTS_DIR)

yaml_stub = types.ModuleType("yaml")
yaml_stub.safe_load = lambda *_args, **_kwargs: {}
sys.modules.setdefault("yaml", yaml_stub)

import aggregate  # noqa: E402
import normalize  # noqa: E402


class NormalizeAndAggregateTests(unittest.TestCase):
    def test_normalize_activity_extracts_fields_and_prefers_positive_duration(self) -> None:
        activity = {
            "id": 123,
            "start_date_local": "2026-02-13 08:15:30+00:00",
            "sport_type": "Running",
            "type": "Workout",
            "name": "Morning Session",
            "distance": "1609.344",
            "moving_time": 0,
            "duration": 95.0,
            "elapsed_time": 120.0,
            "totalElevationGain": "50",
        }
        type_aliases = {"Run": "Jog"}

        normalized = normalize._normalize_activity(activity, type_aliases=type_aliases, source="strava")

        self.assertEqual(normalized["id"], "123")
        self.assertEqual(normalized["date"], "2026-02-13")
        self.assertEqual(normalized["year"], 2026)
        self.assertEqual(normalized["start_date_local"], "2026-02-13T08:15:30+00:00")
        self.assertEqual(normalized["raw_activity_type"], "Workout")
        self.assertEqual(normalized["raw_type"], "Running")
        self.assertEqual(normalized["type"], "Jog")
        self.assertEqual(normalized["distance"], 1609.344)
        self.assertEqual(normalized["moving_time"], 95.0)
        self.assertEqual(normalized["elevation_gain"], 50.0)
        self.assertEqual(normalized["name"], "Morning Session")

    def test_normalize_activity_returns_empty_when_missing_required_fields(self) -> None:
        self.assertEqual(normalize._normalize_activity({}, {}, "strava"), {})
        self.assertEqual(normalize._normalize_activity({"id": "x"}, {}, "strava"), {})
        self.assertEqual(normalize._normalize_activity({"start_date_local": "2026-01-01T00:00:00Z"}, {}, "strava"), {})

    def test_aggregate_groups_by_day_and_filters_types(self) -> None:
        config = {
            "activities": {
                "include_all_types": False,
                "types": ["Run"],
                "exclude_types": ["Ride"],
            }
        }
        items = [
            {
                "id": "a",
                "date": "2026-02-01",
                "year": 2026,
                "type": "Run",
                "distance": 1000,
                "moving_time": 100,
                "elevation_gain": 10,
            },
            {
                "id": "c",
                "date": "2026-02-01",
                "year": 2026,
                "type": "Run",
                "distance": 250,
                "moving_time": 25,
                "elevation_gain": 5,
            },
            {
                "id": "b",
                "date": "2026-02-01",
                "year": 2026,
                "type": "Ride",
                "distance": 9999,
                "moving_time": 999,
                "elevation_gain": 999,
            },
        ]

        with (
            mock.patch("aggregate.load_config", return_value=config),
            mock.patch("aggregate.os.path.exists", return_value=True),
            mock.patch("aggregate.read_json", return_value=items),
            mock.patch("aggregate.utc_now", return_value=datetime(2026, 2, 14, tzinfo=timezone.utc)),
        ):
            output = aggregate.aggregate()

        run_entry = output["years"]["2026"]["Run"]["2026-02-01"]
        self.assertEqual(run_entry["count"], 2)
        self.assertEqual(run_entry["distance"], 1250.0)
        self.assertEqual(run_entry["moving_time"], 125.0)
        self.assertEqual(run_entry["elevation_gain"], 15.0)
        self.assertEqual(run_entry["activity_ids"], ["a", "c"])
        self.assertNotIn("Ride", output["years"]["2026"])


if __name__ == "__main__":
    unittest.main()
