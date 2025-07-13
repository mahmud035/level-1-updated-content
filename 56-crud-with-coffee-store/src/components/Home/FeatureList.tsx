import iconOne from '../../assets/icons/1.png';
import iconTwo from '../../assets/icons/2.png';
import iconThree from '../../assets/icons/3.png';
import iconFour from '../../assets/icons/4.png';
import Feature from './Feature';

export default function FeatureList() {
  return (
    <div className="bg-[#ECEAE3] py-14">
      <div className="container grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Feature icon={iconOne} />
        <Feature icon={iconTwo} />
        <Feature icon={iconThree} />
        <Feature icon={iconFour} />
      </div>
    </div>
  );
}
