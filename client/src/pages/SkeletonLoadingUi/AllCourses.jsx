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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 max-w-screen-xl mx-auto">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="border border-green-500 rounded-lg p-4 space-y-4"
          >
            <div className="w-full rounded-lg aspect-[16/9] skeleton"></div>
            <div className="space-y-2">
              <div className="w-24 h-6 skeleton rounded"></div>
              <div className="w-32 h-4 skeleton rounded"></div>
              <div className="flex items-center space-x-4">
                <div className="w-6 h-4 skeleton rounded"></div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 skeleton rounded"></div>
                  ))}
                </div>
                <div className="w-10 h-4 skeleton rounded"></div>
              </div>
              <div className="flex space-x-3">
                <div className="w-24 h-6 skeleton rounded"></div>
                <div className="w-28 h-6 skeleton rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
