import { useState } from 'react';
import BlogList from '../components/Blog/BlogList';
import Sidebar from '../components/Sidebar/Sidebar';
import { IBlog } from '../types';

export default function HomePage() {
  const [readingTime, setReadingTime] = useState(0);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const handleMarkAsRead = (readTime: number) => {
    setReadingTime((prevReadingTime) => prevReadingTime + readTime);
  };

  const handleAddToBookmark = (blog: IBlog) => {
    const isBlogBookmarked = bookmarks.find(
      (blogTitle) => blogTitle === blog.title
    );
    const title = blog.title;

    return isBlogBookmarked
      ? alert('Blog is already bookmarked')
      : setBookmarks((prevBookmarks) => [...prevBookmarks, title]);
  };

  return (
    <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-4">
      <BlogList
        handleMarkAsRead={handleMarkAsRead}
        handleAddToBookmark={handleAddToBookmark}
      />
      <Sidebar readingTime={readingTime} bookmarks={bookmarks} />
    </div>
  );
}
