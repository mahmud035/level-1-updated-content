import { Link, useRouteError } from 'react-router-dom';
import { IError } from '../../types';

export default function ErrorPage() {
  const error = useRouteError() as IError;
  console.error(error);

  return (
    <section className="flex items-center p-16 dark:dark:bg-[#030317] dark:dark:text-white">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-lg text-center">
          <h2 className="text-xl font-medium text-red-500 mb-7">
            <span className="sr-only">Error</span>
            {error.data || error.statusText}
          </h2>
          <Link
            to="/"
            className="px-8 py-3 font-semibold rounded dark:dark:bg-cyan-800 dark:dark:text-white"
          >
            Back to Homepage 🏡
          </Link>
        </div>
      </div>
    </section>
  );
}
