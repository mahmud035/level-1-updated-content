import { motion } from 'motion/react';
import team1 from '../../assets/images/banner/team1.jpg';
import team2 from '../../assets/images/banner/team2.jpg';

export default function Banner() {
  return (
    <div className="overflow-x-hidden min-h-fit hero">
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="flex-1">
          <motion.img
            src={team1}
            animate={{ y: [50, 80, 50] }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
            className="max-w-xs rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400"
          />
          <motion.img
            src={team2}
            animate={{ x: [100, 130, 100] }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
            className="max-w-xs rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-5xl font-bold">
            Latest&nbsp;
            <motion.span
              animate={{ color: ['#C449F7', '#5D50FF', '#87C1FF'] }}
              transition={{
                duration: 10,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              Jobs
            </motion.span>
            &nbsp;For You!
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Apply Now</button>
        </div>
      </div>
    </div>
  );
}
