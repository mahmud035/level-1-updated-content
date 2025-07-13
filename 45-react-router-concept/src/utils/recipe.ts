export async function getRecipes() {
  const url = 'https://dummyjson.com/recipes?limit=30&skip=0';

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return { recipes: data.recipes };
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function getRecipe(id: string) {
  const url = `https://dummyjson.com/recipes/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return { recipe: data };
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
