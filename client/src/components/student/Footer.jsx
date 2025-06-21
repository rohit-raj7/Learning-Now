import React from 'react';
import { assets } from '../../assets/assets';
import Social from './Social';
import Subscribe from './Subscribe';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden text-left' id='Footer'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-start'>

        {/* Left Section - Logo and Description */}
        <div className='w-full md:w-1/3 mb-8 md:mb-0'>
          <div className='flex items-center gap-2'>
            <img src={assets.logo} alt="Logo" className="h-12" />
            <span className='text-3xl font-medium text-green-500'>Rohit Raj</span>
          </div>
          <h2 className='font-medium text-gray-300 mt-4'>Thank You for Visiting My Learning Web!</h2>
          <p className='text-gray-400 mt-2'>
            I appreciate your time. As a Web developer, I create responsive, user-friendly websites. 
            Feel free to reach out with questions or collaboration ideas!
          </p>
          <div className='mt-4'>
            <Social />
          </div>
        </div>

        {/* Middle Section - Company Links */}
        <div className='w-full md:w-1/5 mb-8 md:mb-0'>
          <h3 className='text-green-600 text-lg font-bold mb-4'>Company</h3>
          <ul className='flex flex-col gap-2 text-gray-400'>
            <li><a href="#Header" className='hover:text-green-400'>Home</a></li>
            <li><a href="#About" className='hover:text-green-400'>About us</a></li>
            <li><a href="#Experience" className='hover:text-green-400'>Works</a></li>
            <li><a href="/educator/educator-profile" className='hover:text-green-400'>Contact us</a></li>
            <li><Link to='/Privacy_Policy' className='hover:text-green-400'>Privacy Policy</Link></li>
            <li><a href="https://rohit-raj.netlify.app/" target="_blank" rel="noopener noreferrer" className='hover:text-green-400'>Portfolio</a></li>
          </ul>
        </div>

        {/* Right Section - Newsletter */}
        <div className='w-full md:w-1/3'>
          <h3 className='text-green-400 text-lg font-bold mb-4'>Subscribe to our news letter</h3>
          <p className='text-gray-400 mb-4 max-w-80'>
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className='flex items-start'>
            <Subscribe />
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className='border-t border-gray-700 py-4 mt-10 text-left text-gray-500'>
        © 2025 Rohit Raj. All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer;
