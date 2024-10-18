import BlogList from '../components/Blog/BlogList';
import Sidebar from '../components/Sidebar/Sidebar';

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-4">
      <BlogList />
      <Sidebar />
    </div>
  );
}
