import React from 'react';

const CourseDetailSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-pulse p-6 bg-[#1a1f2b] text-white min-h-screen">
      {/* Left Main Content */}
      <div className="flex-1 space-y-6">
        {/* Title */}
        <div className="h-10 bg-gray-700 rounded w-3/4" />
        {/* Subtitle */}
        <div className="h-4 bg-gray-700 rounded w-1/4" />
        {/* Ratings + Meta */}
        <div className="h-4 bg-gray-700 rounded w-1/3" />

        {/* Course Structure */}
        <div>
          <div className="h-6 bg-gray-700 rounded w-1/4 mb-4" />
          <div className="space-y-4">
            <div className="bg-[#222736] p-4 rounded space-y-2">
              <div className="h-4 bg-gray-600 rounded w-2/3" />
              <div className="h-3 bg-gray-600 rounded w-1/4" />
            </div>
            <div className="bg-[#222736] p-4 rounded space-y-2">
              <div className="h-4 bg-gray-600 rounded w-4/5" />
              <div className="h-3 bg-gray-600 rounded w-1/4" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="h-6 bg-gray-700 rounded w-1/4 mb-4" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-600 rounded w-2/3" />
            <div className="h-3 bg-gray-600 rounded w-3/4" />
            <div className="h-3 bg-gray-600 rounded w-1/2" />
            <div className="h-3 bg-gray-600 rounded w-4/5" />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-1/3 space-y-4 bg-[#222736] p-4 rounded">
        <div className="h-40 bg-gray-700 rounded" />
        <div className="h-4 bg-red-700 rounded w-1/2" />
        <div className="h-6 bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-700 rounded w-1/3" />
        <div className="h-10 bg-blue-700 rounded" />
        <div className="space-y-2 pt-4">
          <div className="h-3 bg-gray-600 rounded w-full" />
          <div className="h-3 bg-gray-600 rounded w-5/6" />
          <div className="h-3 bg-gray-600 rounded w-3/4" />
          <div className="h-3 bg-gray-600 rounded w-2/3" />
          <div className="h-3 bg-gray-600 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailSkeleton;
