export async function getProducts() {
  const url = 'https://dummyjson.com/products?limit=12&skip=30';

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return { products: data.products };
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
