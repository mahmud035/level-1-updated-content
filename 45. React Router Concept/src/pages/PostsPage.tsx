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
