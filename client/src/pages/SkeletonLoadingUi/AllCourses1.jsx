import React from "react";

const AllCourses = () => {
  const skeletonCards = Array(6).fill(0); // Render 6 skeleton cards

  return (
    <div className="bg-[#1e293b] text-gray-300 min-h-screen p-4 sm:p-6">
      {/* Skeleton shimmer animation */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -600px 0;
            }
            100% {
              background-position: 600px 0;
            }
          }
          .skeleton {
            background: linear-gradient(
              90deg,
              #2c3e50 25%,
              #3a5068 37%,
              #2c3e50 63%
            );
            background-size: 600px 100%;
            animation: shimmer 1.6s infinite linear;
          }
        `}
      </style>

      <div className="text-center mb-10">
        <div className="w-72 h-9 mx-auto rounded-md skeleton mb-4"></div>
        <div className="w-80 h-6 mx-auto rounded-md skeleton"></div>
      </div>

      {/* Grid of skeleton cards matching CourseCard layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="border border-green-500 rounded-2xl p-6 space-y-6"
          >
            <div className="w-full rounded-xl aspect-video skeleton"></div>
            <div className="space-y-4">
              <div className="w-32 h-7 skeleton rounded"></div>
              <div className="w-40 h-5 skeleton rounded"></div>
              <div className="flex items-center space-x-6">
                <div className="w-8 h-5 skeleton rounded"></div>
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 skeleton rounded"></div>
                  ))}
                </div>
                <div className="w-12 h-5 skeleton rounded"></div>
              </div>
              <div className="flex space-x-4">
                <div className="w-28 h-7 skeleton rounded"></div>
                <div className="w-32 h-7 skeleton rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
