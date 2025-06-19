 

import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

 function CallToAction() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/user/signup');
  }
  return (
    <div className='flex flex-col bg-gray-800 items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='md:text-4xl text-xl text-green-400 font-semibold'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-300 sm:text-sm'>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button  onClick={handleClick} className='px-10 py-3 rounded-md text-white bg-green-600'>Get started</button>
        <button className='flex items-center gap-2 px-10 py-3 rounded-md border border-green-500 text-green-500'>
          Learn more
          <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  )

 }
 
 export default CallToAction 