import { Link } from 'react-router';

export default function Banner() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello I am Deep Seek</h1>
          <p className="py-6">
            Progressively enhance sustainable opportunities whereas magnetic
            value. Collaboratively seize effective initiatives before
            leading-edge growth strategies.
          </p>
          <Link to="/generate" className="btn btn-primary">
            Generate Image
          </Link>
        </div>
      </div>
    </div>
  );
}
