import { IComment } from '../../types';

interface ICommentCardProps {
  comment: IComment;
}

export default function CommentCard({ comment }: ICommentCardProps) {
  const { postId, name, email, body } = comment;

  return (
    <div className="w-full shadow-xl card bg-base-100">
      <div className="p-5 card-body flex flex-col justify-between">
        <small>Post ID: {postId}</small>
        <h2 className="text-xl font-medium card-title capitalize">{name}</h2>
        <p>
          <i>{email}</i>
        </p>
        <p>{body}</p>
      </div>
    </div>
  );
}
