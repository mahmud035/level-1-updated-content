import User from '../../assets/images/user.png';
import useExploreJobs from '../../hooks/useExploreJobs';
import Button from '../ui/Button';

export default function Hero() {
  const exploreJobs = useExploreJobs();

  return (
    <div className="flex flex-col items-center gap-4 pt-10 md:flex-row text-balance">
      <div className="pb-10">
        <h2 className="text-7xl leading-[90px] font-light">
          <span>One Step</span> <br />
          <span>Close To Your</span> <br />
          <span className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] bg-clip-text text-transparent">
            Dream Jobs
          </span>
        </h2>
        <p className="py-7">
          Explore thousands of job opportunities with all the information you
          need. Its your future. Come find it. Manage all your job application
          from start to finish.
        </p>
        <Button
          label="Get Started"
          className="rounded-lg"
          onClick={exploreJobs}
        />
      </div>

      <div>
        <img src={User} alt="User" className="object-cover w-full" />
      </div>
    </div>
  );
}
