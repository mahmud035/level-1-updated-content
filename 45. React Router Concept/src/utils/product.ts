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
