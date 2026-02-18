# Movie-Z

## Overview

Movie-Z is a full-stack movie streaming-style web application inspired by Netflix. It offers a seamless user experience for discovering movies, viewing details, and managing user accounts. This project demonstrates a robust implementation of a modern tech stack, featuring secure authentication, real-time data fetching from external APIs, and a responsive, high-fidelity user interface.

## Features

- **Netflix-Style Landing Page:** A visually engaging and responsive hero section with dynamic content.
- **OMDB API Integration:** Real-time fetching of movie data, including posters, plots, and metadata.
- **Search Functionality:** Efficient search capability to find movies by title.
- **Movie Details Page:** Comprehensive view of individual movie information.
- **User Authentication:** Secure signup and login processes.
- **Security:** Password hashing using bcrypt and session-based authentication.
- **Database:** Scalable MySQL database hosted on Aiven.
- **Responsive UI:** Optimized for various devices and screen sizes using Tailwind CSS.

## Tech Stack

### Frontend
- **React:** Component-based library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for rapid and responsive design.
- **React Router:** Declarative routing for single-page applications.

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **MySQL (Aiven):** Relational database management system.
- **bcrypt:** Library to help hash passwords.
- **dotenv:** Module to load environment variables.
- **cors:** Middleware to enable Cross-Origin Resource Sharing.

## Architecture Overview

The application follows a client-server architecture:
- **Client:** A React single-page application (SPA) that interacts with the backend API.
- **Server:** An Express REST API that handles client requests, communicates with the external OMDB API, and manages data persistence in the MySQL database.
- **Database:** A cloud-hosted MySQL instance on Aiven for storing user data.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL database (Aiven or local)

### Frontend Setup

1. Navigate to the project root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```

## Environment Variables

Create a `.env` file in the `server` directory with the following configuration:

```env
PORT=5000
DB_HOST=your_aiven_db_host
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=defaultdb
OMDB_API_KEY=your_omdb_api_key
JWT_SECRET=your_jwt_secret_key
```

## Database Setup (Aiven MySQL)

1. Create a service on Aiven for MySQL.
2. NOTE: The application is configured to automatically create the necessary `users` table if it does not exist upon connection. Ensure your database credentials in the `.env` file are correct.

## API Configuration (OMDB)

1. Obtain a free API key from [OMDB API](http://www.omdbapi.com/apikey.aspx).
2. Add the API key to your `.env` file as `OMDB_API_KEY`.

## Running the Application

1. Ensure your MySQL database is running and accessible.
2. Start the backend server (runs on port 5000 by default).
3. Start the frontend development server (typically runs on port 5173).
4. Open your browser and navigate to `http://localhost:5173`.

## Future Improvements

- Implementation of user watchlists and "Favorites" feature.
- Integration of a payment gateway for premium subscriptions.
- Enhanced profile management and user settings.
- Unit and integration testing.

## License

This project is open-source and available under the [MIT License](LICENSE).
