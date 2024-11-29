import cup1 from '../../assets/images/cups/cup-1.png';
import cup2 from '../../assets/images/cups/cup-2.png';
import cup3 from '../../assets/images/cups/cup-3.png';
import cup4 from '../../assets/images/cups/cup-4.png';
import cup5 from '../../assets/images/cups/cup-5.png';
import cup6 from '../../assets/images/cups/cup-6.png';
import cup7 from '../../assets/images/cups/cup-7.png';
import cup8 from '../../assets/images/cups/cup-8.png';
import SectionInfo from './SectionInfo';

export default function FollowUs() {
  return (
    <div className="container pb-28">
      <div className="flex flex-col items-center justify-center pb-12">
        <SectionInfo title="Follow on Instagram" text="Follow Us Now" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <img src={cup1} alt="" />
        <img src={cup2} alt="" />
        <img src={cup3} alt="" />
        <img src={cup4} alt="" />
        <img src={cup5} alt="" />
        <img src={cup6} alt="" />
        <img src={cup7} alt="" />
        <img src={cup8} alt="" />
      </div>
    </div>
  );
}
