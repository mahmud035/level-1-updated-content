import useFetchData from '../../hooks/useFetchData';
import { IBlog } from '../../types';
import BlogCard from './BlogCard';

interface IBlogListProps {
  handleMarkAsRead: (readTime: number) => void;
  handleAddToBookmark: (blog: IBlog) => void;
}

export default function BlogList({
  handleMarkAsRead,
  handleAddToBookmark,
}: IBlogListProps) {
  const [blogs] = useFetchData<IBlog>('blogs.json');

  return (
    <div className="grid order-2 grid-cols-1 gap-10 md:order-1 md:col-span-3">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          handleMarkAsRead={handleMarkAsRead}
          handleAddToBookmark={handleAddToBookmark}
        />
      ))}
    </div>
  );
}
