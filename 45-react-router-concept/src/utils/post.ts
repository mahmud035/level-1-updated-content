export async function getPosts() {
  const url = 'https://jsonplaceholder.typicode.com/posts';

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return { posts: data };
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function getPostComments(postId: number) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
