# Job Portal Server

This backend API powers the Job Portal platform, offering job seekers and recruiters the ability to create, manage, search, and filter job listings. Built with **Node.js**, **Express**, and **MongoDB**, the server follows industry best practices and a modular architecture for scalability and maintainability.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [Authentication Routes](#authentication-routes)
  - [Job Routes](#job-routes)
  - [Job Application Routes](#recruiter-routes)
- [Contributing](#contributing)

## Overview

The Job Portal Server API is designed to manage and serve job listings, facilitate job searching and filtering, provide user authentication, and enable recruiters to post job openings. This API is consumed by the Job Portal client to provide a seamless experience to users and recruiters.

## Features

- **User Authentication**: Register and log in with JWT-based authentication.
- **Job Management**: Create, update, delete, and fetch job listings.
- **Search and Filter**: Advanced search by job title, location, and salary range.
- **Pagination**: Retrieve job listings with support for pagination.
- **Recruiter Functions**: Recruiters can manage their posted job listings.

## Technologies Used

- **Node.js**: JavaScript runtime for backend development.
- **Express**: Web framework to handle API requests and routing.
- **MongoDB**: NoSQL database for storing job listings and user data.
- **JWT (JSON Web Tokens)**: For user authentication and securing routes.
- **Zod**: For data validation and schema enforcement.
- **Axios**: For handling HTTP requests from the client.

## Installation

Follow these steps to set up the backend locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/mahmud035/Level-1-Updated-Content.git
   ```

2. Navigate to the server directory:

   ```bash
   cd 58. Job Portal/server
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables in a `.env` file:

   ```bash
    NODE_ENV = 'development'
    PORT = 5000

    DATABASE_URI = 'Your database uri'
    DATABASE_NAME = 'Your database name'

    ACCESS_TOKEN_SECRET = 'your-secret-key'
    ACCESS_TOKEN_EXPIRES_IN = 'token expires time'
    REFRESH_TOKEN_SECRET = 'your-secret-key'
    REFRESH_TOKEN_EXPIRES_IN = 'token expires time'
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

The server will be running on `http://localhost:5000`.

## Usage

The Job Portal Server exposes several routes for job listing management, user authentication, and recruiter-specific operations. Below are details for each route.

## API Documentation

### Authentication Routes

- **POST `/auth/login`**: Log in an existing user and receive a JWT token.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "your-jwt-token"
    }
    ```

### Job Routes

- **GET `/jobs`**: Retrieve all job listings with optional query parameters for filtering, sorting, and pagination.

  - **Query Parameters**:
    - `page`: The page number (default: `1`).
    - `limit`: Number of items per page (default: `10`).
    - `sortBy`: Field to sort by (e.g., `salaryRange.min`, `createdAt`).
    - `sortOrder`: Sort order (`asc` or `desc`).
    - `searchQuery`: Search jobs by title or location.
    - `salaryRange.min`, `salaryRange.max`: Salary range filters.
  - **Response**:
    ```json
    {
      "data": [
        {
          "_id": "job_id",
          "title": "Software Engineer",
          "company": "Tech Corp",
          "salaryRange": { "min": 50000, "max": 80000 },
          "location": "New York"
        }
      ],
      "meta": {
        "total": 100,
        "limit": 10,
        "page": 1
      }
    }
    ```

- **POST `/jobs`**: Create a new job listing (recruiter only, requires authentication).

  - **Request Body**:
    ```json
    {
      "title": "Software Engineer",
      "company": "Tech Corp",
      "salaryRange": { "min": 50000, "max": 80000 },
      "location": "New York",
      "description": "We are looking for a software engineer..."
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Job created successfully"
    }
    ```

- **PATCH `/jobs/:id`**: Update an existing job listing (recruiter only, requires authentication).

  - **Response**:
    ```json
    {
      "message": "Job updated successfully"
    }
    ```

- **DELETE `/jobs/:id`**: Delete a job listing (recruiter only, requires authentication).
  - **Response**:
    ```json
    {
      "message": "Job deleted successfully"
    }
    ```

### Recruiter Routes

- **GET `/recruiter-jobs`**: Retrieve all job listings posted by the authenticated recruiter.

  - **Response**:
    ```json
    {
      "data": [
        {
          "_id": "job_id",
          "title": "Software Engineer",
          "company": "Tech Corp"
        }
      ]
    }
    ```

- **POST `/recruiter-jobs`**: Post a new job listing as a recruiter (requires authentication).
  - **Request Body**:
    ```json
    {
      "title": "Product Manager",
      "company": "Innovative Tech",
      "salaryRange": { "min": 70000, "max": 100000 },
      "location": "San Francisco",
      "description": "We are looking for a product manager..."
    }
    ```

## Contributing

We welcome contributions! To contribute, follow these steps:

1. Fork the repository.
2. Clone your fork locally.
3. Create a new branch (`git checkout -b feature-name`).
4. Implement your feature or fix the issue.
5. Commit your changes (`git commit -am 'Add feature'`).
6. Push to your fork (`git push origin feature-name`).
7. Create a pull request to the `main` branch.

### Postman API Documentation

<h3><a href="https://un-core-83592.postman.co/workspace/My-Workspace~978ad5b1-3bf3-4cc6-8eed-660089906b37/collection/27487917-f38c36a0-c39a-4119-9b45-c2d5b2405dd4?action=share&creator=27487917&active-environment=27487917-7f5abd00-b24f-42c7-b6f4-4d2947e5f7a7">View API Documentation</a> </h3>
