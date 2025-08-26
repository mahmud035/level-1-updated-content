import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.jpg';

const Home = () => {
  return (
    <section>
      <div className="bg-gray-200">
        <div className="flex flex-col items-center pb-24 text-center text-gray-900 my-container lg:pb-56">
          <h1 className="w-full text-2xl lg:leading-tight sm:text-4xl lg:text-6xl lg:max-w-3xl title-text">
            Welcome To HeroGadget
          </h1>
          <p className="max-w-2xl my-6 text-xs text-gray-900 sm:text-base md:text-lg max-w-2/3 md:max-w-xl">
            Best E-commerce platform for buying high quality Smart Home
            Appliances at extremely affordable Price.
          </p>
          <div className="flex flex-wrap justify-center">
            <Link to="/shop">
              <button type="button" className="btn-primary">
                Shop Now
              </button>
            </Link>
            <Link to="/about">
              <button type="button" className="btn-outlined">
                Learn more
              </button>
            </Link>
          </div>
        </div>
      </div>
      <img
        src={heroImg}
        alt=""
        className="w-5/6 mx-auto mb-12 -mt-12 bg-gray-500 rounded-lg shadow-md lg:-mt-40"
      />
    </section>
  );
};

export default Home;
