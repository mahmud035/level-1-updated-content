import { ILink } from '../../types';

interface ILinkProps {
  route: ILink;
}

export default function Link({ route }: ILinkProps) {
  return (
    <li key={route.id}>
      <a href={`${route.path}`} className="font-medium">
        {route.name}
      </a>
    </li>
  );
}
