import React from 'react';

const VideoPlayer = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-[#1a1f2b] text-white min-h-screen animate-pulse">
      
      {/* Left Content */}
      <div className="flex-1 space-y-6 w-full">
        {/* Section Title */}
        <div className="h-8 bg-gray-700 rounded w-1/3" />

        {/* Accordion Section */}
        <div className="space-y-4">
          {[1, 2].map((_, idx) => (
            <div key={idx} className="bg-[#222736] rounded p-4 space-y-2">
              <div className="h-5 bg-gray-600 rounded w-1/2" />
              <div className="h-4 bg-gray-700 rounded w-1/3" />
            </div>
          ))}
        </div>

        {/* Rating Section */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-600 w-1/4 rounded" />
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-gray-600 rounded-full" />
            ))}
          </div>
        </div>

        {/* Comment Section */}
        <div className="space-y-2">
          <div className="h-5 bg-green-600 w-1/3 rounded" />
          <div className="h-28 bg-gray-700 rounded" />
        </div>

        {/* Submit Button */}
        <div className="w-24 h-10 bg-blue-700 rounded" />
      </div>

      {/* Right Sidebar / Image */}
      <div className="lg:w-1/2 w-full">
        <div className="h-[400px] w-full bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default VideoPlayer;
