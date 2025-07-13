import bgCoffeeOne from '../../../assets/images/coffee-section-bg-1.png';
import bgCoffeeTwo from '../../../assets/images/coffee-section-bg-2.png';

export default function BackgroundImage() {
  return (
    <>
      <img src={bgCoffeeOne} alt="" className="absolute left-0 top-32 -z-10" />
      <img src={bgCoffeeTwo} alt="" className="absolute right-0 top-80 -z-10" />
    </>
  );
}
