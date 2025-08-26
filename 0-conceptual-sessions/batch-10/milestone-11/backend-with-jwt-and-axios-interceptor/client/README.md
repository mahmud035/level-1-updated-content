# SoloSphere: Job Portal Web Application

A dynamic and feature-rich job portal that allows job seekers to search, filter, and apply for jobs, while enabling recruiters to post and manage job listings. This application ensures an optimal experience for both recruiters and job seekers by offering an intuitive UI and advanced functionalities like sorting, filtering by salary range, job title, and location, and real-time search results.

## [Visit SoloSphere: Job Portal](https://solosphere-b1795.web.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Overview

This project is a fully functional job portal designed for both job seekers and recruiters. It integrates powerful search, filtering, and sorting capabilities, making it easy to find the perfect job or candidate. The web application is built with React and TypeScript, and it uses the TanStack Query library for efficient data fetching and state management.

## Features

- **Search Jobs**: Search for jobs by title, location, or keywords with real-time filtering.
- **Job Sorting**: Sort job listings by creation date or salary range.
- **Job Filtering**: Filter jobs based on salary range, job type, and more.
- **Pagination**: Efficient pagination for large job listings, ensuring faster load times.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Real-time Updates**: Updated job listings and searches as users interact with the page.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Adds type safety to JavaScript, improving code quality.
- **Tailwind CSS**: Utility-first CSS framework for custom and responsive UI design.
- **Axios**: HTTP client for making API requests to fetch job data.
- **TanStack Query (v5)**: Data fetching and caching library for efficient state management and API handling.
- **React Icons**: Provides SVG icons for various UI components.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mahmud035/Level-1-Updated-Content.git
   ```

2. **Navigate to the project folder:**

   ```bash
   cd Level-1-Updated-Content/0.Conceptual Sessions/Batch-10/Milestone-11/Backend with JWT and Axios Interceptor/client
   ```

3. **Install the required dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   This will open the application in your default browser at `http://localhost:5173`.

## Usage

Once the app is running, you can:

- **Browse Jobs**: View job listings, search for jobs by title, location, or keyword.
- **Apply Filters**: Narrow down search results based on criteria like salary range and job type.
- **Sort Listings**: Sort the job listings by salary or date posted.
- **Pagination**: Navigate through multiple pages of job results.

## API Endpoints

This project communicates with the backend API to fetch job listings, and the endpoints are structured as follows:

- **GET `/jobs`**: Retrieves a list of jobs with optional query parameters like `page`, `limit`, `sortBy`, `sortOrder`, `searchQuery`, and filter parameters.
- **POST `/jobs`**: Allows recruiters to post new job listings.
- **PATCH `/jobs/{jobId}`**: Updates an existing job listing.
- **DELETE `/jobs/{jobId}`**: Deletes a job listing.

For more details on the backend API, refer to the backend repository.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, follow these steps:

1. **Fork** the repository.
2. **Clone** your fork locally.
3. **Create a new branch** (`git checkout -b feature-name`).
4. **Make your changes** and commit them (`git commit -am 'Add new feature'`).
5. **Push your branch** (`git push origin feature-name`).
6. **Submit a pull request** with a detailed description of the changes.
