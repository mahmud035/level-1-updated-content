# React Router Concept Project

![React Router](https://img.shields.io/badge/React-Router-blue)  
![Version](https://img.shields.io/badge/version-6.27.0-brightgreen)  
![React](https://img.shields.io/badge/React-18.3.1-blue)

- **Live Site URL**: [Live Site](https://45-react-router-concept-batch-09.netlify.app/)

## 🚀 Overview

This repository demonstrates the **React Router** concept, using core functionalities of `react-router-dom` to create a dynamic single-page application (SPA). It provides examples of how to use the following features:

- **Dynamic Route Management**
- **Fetching Product Data & Single Product Data with Loaders**
- **Various Hooks from `react-router-dom`**
- **Nested Routing and Layouts**

## ✨ Key Features

1. **React Router DOM Integration**  
   The project is built using `react-router-dom`, providing a seamless navigation experience between pages.
2. **Data Loading with Loaders**
   - Products and single product data are fetched using the **loader functions**, demonstrating how to load data before rendering a component.
3. **React Router Hooks**  
   Utilize several React Router hooks for navigation and data handling:
   - `useLoaderData` for accessing loader-fetched data.
   - `useParams` for handling route parameters (e.g., product IDs).
   - `useNavigate` for programmatically navigating between pages.
4. **Nested Routing**  
   The project includes **nested routes**, showcasing the power of React Router for rendering layouts and sub-pages.

5. **Modular Component Structure**  
   A well-organized and scalable component structure, following best practices for large-scale React projects.

---

## 🗂️ Project Structure

Here’s a brief overview of the project structure:

```sh
Level-1-Updated-Content/
├── 45. React Router Concept/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── RootLayout.tsx
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.tsx
│   │   │   ├── Product/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductDetails.tsx
│   │   │   ├── Recipe/
│   │   │   │   ├── RecipeCard.tsx
│   │   │   │   ├── RecipeDetails.tsx
│   │   ├── pages/
│   │   │   │   ├── ContactUsPage.tsx
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── PostsPage.tsx
│   │   │   │   ├── ProductsPage.tsx
│   │   │   │   ├── RecipesPage.tsx
│   │   ├── routes/
│   │   │   ├── routes.tsx
│   │   ├── shared/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   ├── types/
│   │   │   ├── index.ts
│   │   ├── utils/
│   │   │   ├── index.ts
│   │   │   ├── post.ts
│   │   │   ├── recipe.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
├── node_modules/
└── package-lock.json
```

## 🔑 Key Concepts

1. **React Router DOM**:
   This project uses the latest version of React Router DOM to handle navigation between the following routes:

- `/` — Home Page
- `/products` — Products List Page
- `/products/:id` — Single Product Details Page

2. **Data Fetching with Loaders**:
   Loaders are used to fetch product data before the component renders. The data is accessed through the useLoaderData hook.

```javascript
export async function getProducts() {
  const url = 'https://dummyjson.com/products?limit=30&skip=30';

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return { products: data.products };
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function getProduct(id: string) {
  const url = `https://dummyjson.com/products/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return { product: data };
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
```

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'products',
            loader: getProducts,
            element: <ProductsPage />,
          },
          {
            path: 'products/:id',
            loader: ({ params }) => {
              const id = params.id;
              if (!id) throw new Error('Product ID is undefined'); // Type guard
              return getProduct(id);
            },
            element: <ProductDetails />,
          },
          {
            path: 'recipes',
            loader: getRecipes,
            element: <RecipesPage />,
          },
          {
            path: 'recipes/:id',
            loader: ({ params }) => {
              const id = params.id;
              if (!id) throw new Error('Recipe ID is undefined'); // Type guard
              return getRecipe(id);
            },
            element: <RecipeDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
```

```tsx
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import PostCard from '../components/Post/PostCard';
import { ILoaderData, IPost } from '../types';

export default function PostsPage() {
  const { posts } = useLoaderData() as ILoaderData;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <h2 className="py-6 text-3xl font-semibold text-center text-white">
        Post List
      </h2>

      <div className="grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {posts.map((post: IPost) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes. Ensure that your code adheres to the project’s coding standards and includes necessary tests.
