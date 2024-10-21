import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import RecipeCard from '../components/Recipe/RecipeCard';
import { ILoaderData, IRecipe } from '../types';

export default function RecipesPage() {
  const { recipes } = useLoaderData() as ILoaderData;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <h2 className="py-6 text-3xl font-semibold text-center text-white">
        Recipe List
      </h2>

      <div className="grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe: IRecipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
