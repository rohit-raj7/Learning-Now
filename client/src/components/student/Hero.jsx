import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/student/SearchBar';
import { assets } from '../../assets/assets';

const words = ['Streaming Data', 'Real-time Insights', 'Live Events'];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative flex flex-col items-center text-center px-4 sm:px-8 md:px-12 lg:px-24 pt-10 pb-16 md:pt-20 md:pb-24 font-[Georgia]">
        <h1 className="text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">Empower your future with the.</h1>

        <h1 className="text-gray-100 mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium max-w-full break-words">courses Built for{' '}
          <span className="inline-block px-3 mt-4 py-1 border border-[#15d693] rounded-[12px] text-[#10b27c] font-[Courier_New] transition-opacity duration-500 ease-in-out whitespace-nowrap">
            {words[index]}
          </span>
        </h1>

        {/* Decorative Image */}
        <img
          src={assets.sketch}
          alt="sketch"
          className="hidden md:block -bottom-6 right-4 md:right-12 lg:right-24 w-28 md:w-36 lg:w-40"
        />

        <p className="text-gray-300 mt-9 text-base sm:text-lg md:text-xl max-w-md sm:max-w-xl md:max-w-3xl mx-auto text-center px-4 md:px-0">
          We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
        </p>
        <div className="mt-7 px-4 sm:px-8 md:px-16 lg:px-32">
          <SearchBar />
        </div>
      </div>



    </>
  );
};

export default Hero;
