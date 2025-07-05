import React from "react";

const LatestEnrollmentsSkeleton = () => {
  const skeletonRows = Array(6).fill(0);

  return (
    <div className="bg-[#1e293b] text-gray-300 w-full rounded-xl border border-green-500 p-4">
      {/* Table Header */}
      <div className="hidden sm:flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="w-6 h-6 skeleton rounded"></div>
        <div className="w-40 h-6 skeleton rounded"></div>
        <div className="w-32 h-6 skeleton rounded"></div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-700">
        {skeletonRows.map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4"
          >
            {/* Index */}
            <div className="w-4 h-4 skeleton rounded sm:mr-4"></div>

            {/* Avatar + Name + ID */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-10 h-10 skeleton rounded-full"></div>
              <div className="flex flex-col space-y-2">
                <div className="w-32 h-4 skeleton rounded"></div>
                <div className="w-48 sm:w-64 h-3 skeleton rounded"></div>
              </div>
            </div>

            {/* Course Title */}
            <div className="w-24 h-4 skeleton rounded sm:self-auto self-start"></div>
          </div>
        ))}
      </div>

      {/* Skeleton style */}
      <style>
        {`
        @keyframes shimmer {
          0% {
            background-position: -500px 0;
          }
          100% {
            background-position: 500px 0;
          }
        }
        .skeleton {
          background: linear-gradient(
            90deg,
            #2c3e50 25%,
            #3a5068 37%,
            #2c3e50 63%
          );
          background-size: 500px 100%;
          animation: shimmer 1.5s infinite linear;
        }
      `}
      </style>
    </div>
  );
};

export default LatestEnrollmentsSkeleton;
