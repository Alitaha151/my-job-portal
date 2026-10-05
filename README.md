# Goodwork Job Portal

A responsive job board built with React, React Router, Bootstrap 5, and the Remotive public jobs API.

## Features

- Browse live remote roles with loading, error, and empty states.
- Search by keyword and location; filter by location, department, and job type.
- Paginate listings and open a dedicated job detail page.
- Save role snapshots in browser storage so a saved listing stays available if it leaves the live feed.
- Submit a validated demo application. Applications are stored in this browser only; they are not sent to an employer.

## Run Locally

Use Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, then preview it with `npm run preview`. Run `npm run lint` for ESLint.

## Job Data

The app fetches up to 80 listings from `https://remotive.com/api/remote-jobs`. No API key is required. If the feed is unreachable or returns no listings, the app displays sample roles and an explanatory notice.

## Publish

To push to GitHub, create an empty repository and connect it as the `origin` remote, then run:

```sh
git init
git add .
git commit -m "Build Goodwork job portal"
git branch -M main
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

To deploy on Netlify, import that GitHub repository and use `npm run build` as the build command and `dist` as the publish directory. The `public/_redirects` file routes direct visits to React Router pages back through the app entry point.
