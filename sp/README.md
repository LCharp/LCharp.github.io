# Startpage

A minimalist, highly styled custom startpage/new tab page designed with striking typography and clean aesthetics. It is built using vanilla HTML, CSS, JavaScript and Gemini 3.1 using frontend design skill.

![Screenshot](Screenshot.png)

## Features

- **Search**: Quick access DuckDuckGo search bar.
- **Clock**: Real-time clock display.
- **Anime Integration (AniList)**: Dynamically fetches and displays ongoing anime series you might be interested in, straight from the AniList GraphQL API. Uses local storage to cache data daily for performance.
- **Bookmarks Grid**: Quick links categorized for easy access, dynamically rendered.
- **Distinctive Aesthetics**: Powered by Oat UI (a minimalistic baseline CSS framework) and beautiful web fonts (`Fragment Mono` and `Syne`).

## Project Structure

- `index.html`: The main entry point.
- `style.css`: Contains custom CSS styling, animations, and variables.
- `js/main.js`: Core initialization script.
- `js/data.js`: Holds data for the bookmarks / quick links.
- `js/components/`:
  - `Clock.js`: Logic for the real-time clock.
  - `BookmarkGrid.js`: Renders the categorized bookmark links.
  - `Anilist.js`: Handles fetching, caching, and displaying anime from the AniList API.

## Usage

Simply open `index.html` in your web browser. To set it as your default new tab page, you can use a browser extension (like Custom New Tab URL) that allows you to specify a local file path.
