import { useLoaderData } from 'react-router-dom';
import { ILoaderData } from '../../types';
import CommentCard from './CommentCard';

export default function PostDetails() {
  const { comments } = useLoaderData() as ILoaderData;

  return (
    <>
      <h2 className="py-6 text-3xl font-semibold text-center text-white">
        Post Comments
      </h2>

      <div className="w-full shadow-xl card bg-base-100">
        <div className="p-5 card-body flex flex-col justify-between">
          <h2 className="text-xl font-medium card-title capitalize">Post ID</h2>
          <p>body</p>
        </div>

        <div className="grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
}
