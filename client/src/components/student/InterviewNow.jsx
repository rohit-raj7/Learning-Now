import React from 'react';

function InterviewNow() {
  const handleClick = () => {
    window.location.href = 'https://ai-interviewnow.vercel.app/';
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-4">
      <div
        className="bg-gray-800 border border-gray-700 rounded-xl 
                   w-full max-w-md h-full max-h-[400px] p-8 
                   flex flex-col gap-4 transition-all"
      >
        <h3 className="text-2xl text-gray-300 font-bold text-center">Interview Now</h3>
        <p className="text-lg text-gray-400 text-center">Get ready for your interview</p>
        <button
          onClick={handleClick}
          className="mt-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 text-lg"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}

export default InterviewNow;
