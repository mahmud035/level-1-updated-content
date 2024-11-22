import { useNavigate } from 'react-router-dom';

export default function useExploreJobs() {
  const navigate = useNavigate();

  // Navigate to HomePage and scroll to featured jobs section
  const exploreJobs = () => {
    navigate('/');
    setTimeout(() => {
      document
        .getElementById('featured-jobs')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return exploreJobs;
}
