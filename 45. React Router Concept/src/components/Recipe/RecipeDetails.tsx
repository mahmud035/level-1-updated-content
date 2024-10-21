import { useLoaderData, useNavigate } from 'react-router-dom';
import { ILoaderData } from '../../types';

export default function RecipeDetails() {
  const { recipe } = useLoaderData() as ILoaderData;
  const navigate = useNavigate();
  const {
    name,
    image,
    cuisine,
    difficulty,
    caloriesPerServing,
    servings,
    tags,
    instructions,
    ingredients,
  } = recipe;

  return (
    <div className="pb-12">
      <h2 className="py-6 text-3xl font-semibold text-center text-white">
        Recipe Details
      </h2>

      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm my-4 bg-cyan-800"
      >
        Go Back
      </button>

      <div className="card lg:card-side lg:flex bg-base-100 shadow-xl">
        <figure className="lg:w-1/2 w-full h-1/2 flex items-stretch">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full object-center rounded-sm"
          />
        </figure>
        <div className="card-body lg:w-1/2 w-full h-1/2 lg:pt-0 flex items-stretch">
          <div>
            <h2 className="text-xl font-medium card-title">Name: {name}</h2>
            <p>Cuisine: {cuisine}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Calories Per Serving: {caloriesPerServing}</p>
            <p>Servings: {servings}</p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 bg-gray-800 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="inline-block px-2 py-1 bg-gray-800 rounded-md"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Instructions</h3>
              <ol className="list-decimal list-inside">
                {instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
