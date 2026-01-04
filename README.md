![DSML Logo](public/DSML_logo.png)

# DSML Club — Website

A lightweight website for the DSML Club showcasing members, a LeetCode leaderboard, and project information.

- **UI design:** Designed by Harsha Gowda — [https://iknowharsha.framer.website/](https://iknowharsha.framer.website/).
- **Frameworks & tools:** Vite, React, TypeScript, PostCSS. Frontend components live in the `components/` and `pages/` folders.

## Features

- Leaderboard driven by CSV data in `public/data/` (see `leetcode_leaderboard.csv`).
- Members and people pages with headshots in `public/headshots/`.
- Small Python utility `leetcode_leaderboard.py` (requirements listed in `requirements.txt`) to help build/update leaderboard data.

## Quick start

- Install dependencies:

```bash
npm install
```

- Start the dev server:

```bash
npm run dev
```

- To run the Python script (optional):

```bash
pip install -r requirements.txt
python leetcode_leaderboard.py
```