import { IComment } from '../../types';
import CommentCard from './CommentCard';

interface ICommentsModalProps {
  comments: IComment[];
  onClose: () => void;
}

export default function CommentsModal({
  comments,
  onClose,
}: ICommentsModalProps) {
  return (
    <dialog id="modal" className="modal">
      <div className="modal-box">
        <h3 className="font-semibold">Comments: ({comments.length})</h3>

        <div className="grid grid-cols-1 gap-5">
          {comments.map((comment: IComment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button type="button" onClick={onClose} className="btn">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
