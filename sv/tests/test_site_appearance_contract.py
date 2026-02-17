import os
import re
import unittest


ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
INDEX_PATH = os.path.join(ROOT_DIR, "site", "index.html")


class SiteAppearanceContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        with open(INDEX_PATH, "r", encoding="utf-8") as handle:
            cls.html = handle.read()

    def test_expected_fonts_and_background_theme_are_present(self) -> None:
        self.assertIn("Space+Grotesk", self.html)
        self.assertIn("JetBrains+Mono", self.html)
        self.assertIn('font-family: "Space Grotesk", system-ui, sans-serif;', self.html)
        self.assertIn("background: radial-gradient(circle at top left, #1e293b, var(--bg))", self.html)

    def test_required_css_variables_exist(self) -> None:
        required_vars = [
            "--bg",
            "--card",
            "--accent",
            "--radius",
            "--summary-desktop-columns",
            "--dashboard-content-rail-width",
            "--cell",
            "--gap",
        ]
        for var in required_vars:
            self.assertIn(var, self.html)

    def test_mobile_and_desktop_breakpoints_exist(self) -> None:
        for breakpoint in (
            "@media (min-width: 901px)",
            "@media (max-width: 900px)",
            "@media (max-width: 720px)",
            "@media (max-width: 375px)",
        ):
            self.assertIn(breakpoint, self.html)

    def test_core_dashboard_mount_points_and_controls_exist(self) -> None:
        expected_ids = [
            "dashboardTitle",
            "summary",
            "heatmaps",
            "tooltip",
            "headerMeta",
            "typeButtons",
            "yearButtons",
            "typeMenu",
            "yearMenu",
            "typeClearButton",
            "yearClearButton",
            "resetAllButton",
            "footerHostedPrefix",
            "footerHostedLink",
            "footerPoweredLabel",
            "footerPoweredLink",
        ]
        for element_id in expected_ids:
            self.assertRegex(self.html, rf'id="{re.escape(element_id)}"')

        self.assertNotIn('id="updated"', self.html)

        self.assertIn('class="header-link repo-link"', self.html)
        self.assertIn('class="header-link strava-profile-link"', self.html)
        self.assertIn('id="footerPoweredLabel"', self.html)
        self.assertIn(">powered<", self.html)
        self.assertIn("aspain/git-sweaty", self.html)
        self.assertIn('<script src="app.js?v=__APP_VERSION__"></script>', self.html)


if __name__ == "__main__":
    unittest.main()
