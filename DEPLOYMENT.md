# Deployment Guide for Movie-Z (MERN Stack)

This guide walks you through deploying your MERN stack application (Vite Frontend + Express Backend) to Vercel.

> [!IMPORTANT]
> **Database Hosting**: Vercel does **NOT** host databases. You must use a cloud-hosted MySQL database (e.g., Aiven, Railway, PlanetScale, default AWS RDS).

## Prerequisites

1.  **GitHub Account**: Your project must be pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **Cloud Database**: A running MySQL database accessible via the internet.

## Step 1: Prepare Your Database

Ensure you have your database connection details ready:
-   `DB_HOST`
-   `DB_USER`
-   `DB_PASSWORD`
-   `DB_NAME`

## Step 2: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

## Step 3: Deploy to Vercel

1.  Log in to your Vercel Dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `movie-2-z` (or similarly named) repository.
4.  **Framework Preset**: Select **Vite**.
5.  **Root Directory**: Leave as `./` (default).

## Step 4: Environment Variables

Expand the **"Environment Variables"** section and add the following keys from your `.env` file. **Do not copy the port**.

| Key | Value (Example) |
| :--- | :--- |
| `DB_HOST` | `your-db-host.aivencloud.com` |
| `DB_USER` | `avnadmin` |
| `DB_PASSWORD` | `your-secure-password` |
| `DB_NAME` | `defaultdb` |
| `JWT_SECRET` | `your-secret-key` |
| `NODE_ENV` | `production` |

> [!NOTE]
> You do **NOT** need to set `PORT`. Vercel handles this automatically.

## Step 5: Deploy

Click **"Deploy"**.

Vercel will:
1.  Build your frontend (Vite).
2.  Build your backend (Serverless Function).
3.  Deploy both to unique URLs.

## Step 6: Troubleshooting

-   **500 Errors**: Check the "Logs" tab in Vercel. It usually means a database connection failure. Ensure your database allows connections from the public internet (0.0.0.0/0) or check Vercel's IP allowlist guide.
-   **CORS Issues**: If you see CORS errors, ensure your backend `cors` configuration allows the Vercel domain. In `server/server.js`, you might need to update:
    ```javascript
    app.use(cors({
        origin: ["https://your-vercel-project.vercel.app"]
    }));
    ```
    (Currently, it allows all origins `app.use(cors())`, which is fine for testing but less secure).

## Done!

Your app should now be live at `https://your-project-name.vercel.app`.

## Updating Environment Variables (Post-Deployment)

If you need to change your API keys (like `VITE_OMDB_API_KEY`) or database credentials after deploying:

1.  Go to your **Vercel Dashboard** and select your project.
2.  Click on the **Settings** tab.
3.  Select **Environment Variables** from the sidebar.
4.  Find the variable you want to update (e.g., `VITE_OMDB_API_KEY`).
5.  Click the three dots (options) next to it and select **Edit**.
6.  Enter the new value and save.
7.  **IMPORTANT**: You must **Redeploy** for changes to take effect:
    -   Go to the **Deployments** tab.
    -   Click the three dots next to your latest deployment.
    -   Select **Redeploy**.
