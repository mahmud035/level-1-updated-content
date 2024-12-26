import { useRouteError } from 'react-router';
import { IRouterError } from '../types';

export default function ErrorPage() {
  const error = useRouteError() as IRouterError;

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
      </p>
    </div>
  );
}
