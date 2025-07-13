import { ILink } from '../../types';
import Link from './Link';

interface INavLinksProps {
  routes: ILink[];
  showNavLinks: boolean;
}

export default function NavLinks({ routes, showNavLinks }: INavLinksProps) {
  return (
    <ul
      className={`${
        showNavLinks ? `flex flex-col gap-4 absolute top-6 left-1/2` : 'hidden'
      } md:flex md:gap-6 xl:gap-8`}
    >
      {routes.map((route: ILink) => (
        <Link key={route.id} route={route} />
      ))}
    </ul>
  );
}
