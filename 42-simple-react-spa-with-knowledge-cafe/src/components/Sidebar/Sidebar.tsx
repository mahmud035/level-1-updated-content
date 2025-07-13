import Bookmark from './Bookmark';

interface ISidebarProps {
  readingTime: number;
  bookmarks: string[];
}

export default function Sidebar({ readingTime, bookmarks }: ISidebarProps) {
  return (
    <div className="order-1 md:order-2 md:col-span-1">
      <h3 className="px-5 py-4 text-2xl font-semibold text-purple-800 border rounded-lg">
        Reading Time: {readingTime} min
      </h3>

      <div className="mt-8 px-5 py-4 text-2xl font-medium border rounded-lg">
        <h3>Bookmarked Blogs: {bookmarks.length}</h3>

        {bookmarks.map((bookmark) => (
          <Bookmark key={bookmark} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}
