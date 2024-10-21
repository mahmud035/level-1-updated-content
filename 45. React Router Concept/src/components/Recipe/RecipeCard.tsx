import { Link } from 'react-router-dom';
import { IRecipe } from '../../types';

interface IRecipeCardProps {
  recipe: IRecipe;
}

export default function RecipeCard({ recipe }: IRecipeCardProps) {
  const { id, name, image, cuisine, difficulty, caloriesPerServing, servings } =
    recipe;

  return (
    <div className="w-full shadow-xl card bg-base-100">
      <img src={image} alt={name} className="w-full h-48 rounded-sm" />

      <div className="p-5 card-body flex flex-col justify-between">
        <h2 className="text-xl font-medium card-title">Name: {name}</h2>
        <p>Cuisine: {cuisine}$</p>
        <p>Difficulty: {difficulty}$</p>
        <p>CaloriesPerServing: {caloriesPerServing}</p>
        <p>Servings: {servings}</p>
        <Link to={`${id}`} className="btn btn-sm">
          See Recipe Details
        </Link>
      </div>
    </div>
  );
}
