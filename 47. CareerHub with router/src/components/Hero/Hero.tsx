import User from '../../assets/images/user.png';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <div className="pt-10 flex flex-col gap-4 md:flex-row items-center text-balance">
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
        <Button label="Get Started" />
      </div>

      <div>
        <img src={User} alt="User" className="w-full object-cover" />
      </div>
    </div>
  );
}
