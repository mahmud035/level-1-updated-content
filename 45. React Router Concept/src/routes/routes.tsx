import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../components/Error/ErrorPage';
import RootLayout from '../components/layout/RootLayout';
import ProductDetails from '../components/Product/ProductDetails';
import RecipeDetails from '../components/Recipe/RecipeDetails';
import ContactUsPage from '../pages/ContactUsPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import ProfilePage from '../pages/ProfilePage';
import RecipesPage from '../pages/RecipesPage';
import { getProduct, getProducts } from '../utils/product';
import { getRecipe, getRecipes } from '../utils/recipe';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // IMPORTANT: RootLayout or DashboardLayout যেন break না করে, সেজন্য ভিতরে আবার এই errorElement টা ব্যবহার করা হয়েছে। এরফলে যেখানে error হবে, শুধু ঐখানে error page / error message দেখাবে। Full UI break করবে না। এটাতে user experience (UX) better হবে।

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
          {
            path: 'contact',
            element: <ContactUsPage />,
          },
          {
            path: 'profile/:profileId',
            element: <ProfilePage />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
