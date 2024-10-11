import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      {error && (
        <div className="flex flex-col min-h-[700px] justify-center items-center">
          <h1 className="text-4xl text-red-500">
            Ops! An Error Ocurred! <i>{error.statusText || error.message}</i>
          </h1>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
