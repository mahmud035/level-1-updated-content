import { useNavigate } from 'react-router';

export default function useScroll(route: string, sectionId: string) {
  const navigate = useNavigate();

  const handleScroll = () => {
    navigate(route);
    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return handleScroll;
}
