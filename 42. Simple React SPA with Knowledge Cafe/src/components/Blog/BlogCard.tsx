import { FaRegBookmark } from 'react-icons/fa';
import { IBlog } from '../../types';

interface IBlogCardProps {
  blog: IBlog;
  handleMarkAsRead: (readTime: number) => void;
  handleAddToBookmark: (blog: IBlog) => void;
}

export default function BlogCard({
  blog,
  handleMarkAsRead,
  handleAddToBookmark,
}: IBlogCardProps) {
  const { title, cover, authorImg, author, postedDate, readingTime, hashtags } =
    blog;

  return (
    <>
      <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
        <figure>
          <img src={cover} alt="blog cover" className="w-full aspect-video" />
        </figure>

        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="flex items-center justify-between">
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="relative inline-flex items-center justify-center w-12 h-12 text-white rounded-full"
              >
                <img
                  src={authorImg}
                  alt="user name"
                  title="user name"
                  width="48"
                  height="48"
                  className="max-w-full rounded-full"
                />
              </a>
              <div>
                <p className="text-xl font-medium text-slate-700">{author}</p>
                <p className="text-sm text-slate-400">{postedDate}</p>
              </div>
            </div>

            <div className="flex gap-1">
              <p className="text-slate-400">{readingTime} min read</p>
              <button onClick={() => handleAddToBookmark(blog)}>
                <FaRegBookmark />
              </button>
            </div>
          </header>
          <h1 className="text-3xl font-semibold text-slate-700">{title}</h1>
          <p>
            {hashtags.map((hashtag) => (
              <span key={hashtag} className="inline-block mt-4 mr-4">
                #{hashtag}
              </span>
            ))}
          </p>
          <button
            onClick={() => handleMarkAsRead(readingTime)}
            className="pt-4 font-bold text-purple-800 underline"
          >
            Mark As Read
          </button>
        </div>
      </div>
    </>
  );
}
