import { useEffect, useState } from 'react';
import { IPost } from '../../types';
import { getPostComments } from '../../utils/post';
import CommentsModal from './CommentsModal';

interface IPostCardProps {
  post: IPost;
}

export default function PostCard({ post }: IPostCardProps) {
  const { id, title, body } = post;
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowComments = async (id: number) => {
    const data = await getPostComments(id);

    if (data) {
      setComments(data);
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (showModal) {
      const modal = document.getElementById('modal') as HTMLDialogElement;
      if (modal) modal.showModal();
    }
  }, [showModal]);

  return (
    <div className="w-full shadow-xl card bg-base-100">
      <div className="p-5 card-body flex flex-col justify-between">
        <p>Post ID: {id}</p>
        <h2 className="text-xl font-medium card-title capitalize">{title}</h2>
        <p>{body}</p>
        <button onClick={() => handleShowComments(id)} className="btn btn-sm">
          See Comments
        </button>
      </div>

      {showModal && (
        <CommentsModal
          comments={comments}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
