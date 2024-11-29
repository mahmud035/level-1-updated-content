import bgBanner from '../../assets/images/bg-banner.png';

export default function Banner() {
  return (
    <header
      className="h-[800px] flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-start justify-center max-w-2xl p-4 text-white xl:ml-[450px]">
        <h2 className="mb-4 text-5xl text-left">
          Would you like a Cup of Delicious Coffee?
        </h2>
        <p className="mb-8 text-left">
          It's coffee time - Sip & Savor - Relaxation in every sip! Get the
          nostalgia back!! Your companion of every moment!!! Enjoy the beautiful
          moments and make them memorable.
        </p>
        <button className="btn-learn-more">Learn More</button>
      </div>
    </header>
  );
}
