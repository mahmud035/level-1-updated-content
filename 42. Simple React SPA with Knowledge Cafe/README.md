# Simple React SPA with Knowledge Cafe

Welcome to the **Simple React SPA with Knowledge Cafe** repository! This repository contains the source code for a simple Single Page Application (SPA) built with React, demonstrating features of a knowledge sharing platform.

- **Live Site URL**: [Knowledge Cafe](https://knowledge-cafe-batch-09.netlify.app/)

## Introduction

This project demonstrates a simple React-based SPA with features centered around a Knowledge Cafe, where users can view, read, and manage articles and blogs effectively. It showcases components, state management, and routing in a React application.

## Features

- **Responsive Layout**: Optimized for various screen sizes.
- **Dynamic Blog List**: Fetches and displays blogs dynamically.
- **Reading Time Calculation**: Tracks and displays total reading time for the user.
- **Bookmark Management**: Allows users to bookmark articles and manage their reading list.
- **Reusable Components**: Modular components for better code reuse and maintenance.
- **Custom Hooks**: Utilizes custom hooks for data fetching and other logic.

## Installation

1. Clone the repository:

```sh
git clone https://github.com/mahmud035/Level-1-Updated-Content.git

cd 42. Simple React SPA with Knowledge Cafe
```

2. Install the dependencies:

```sh
npm install
```

3. To run the project, use the following command:

```sh
npm start
```

## Project Structure

The project is organized as follows:

```sh
Level-1-Updated-Content/
├── 42. Simple React SPA with Knowledge Cafe/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Blog/
│   │   │   │   ├── BlogList.tsx
│   │   │   │   ├── Blog.tsx
│   │   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   ├── hooks/
│   │   │   ├── useFetchData.ts
│   │   ├── types/
│   │   │   ├── index.ts
│   │   ├── utils/
│   │   │   ├── index.ts
│   │   ├── App.tsx
│   ├── README.md
│   ├── package.json
│   └── ...
```

- **src/components**: Contains reusable React components like _BlogList_, _Blog_, and _Sidebar_.

- **src/hooks**: Custom hooks for handling data fetching and other logic.

- **src/types**: TypeScript types and interfaces.

- **src/utils**: Utility functions for managing local storage and other tasks.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes. Ensure that your code adheres to the project’s coding standards and includes necessary tests.
