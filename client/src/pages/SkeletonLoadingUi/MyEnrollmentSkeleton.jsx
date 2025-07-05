import React, { useState, useEffect } from 'react';

const MyEnrollmentSkeleton = () => {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      // simulate data load
      setEnrollments([/* real data here */]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? <EnrollmentSkeleton /> : (
        <div>{/* Render actual enrolled course list */}</div>
      )}
    </>
  );
};

const EnrollmentSkeleton = () => {
  return (
    <div className="p-6 bg-[#1a1f2b] text-white min-h-screen animate-pulse">
      <h2 className="text-2xl font-bold mb-6">My Enrollments</h2>

      <div className="border border-white/20 rounded">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex items-center gap-4 border-b border-white/10 p-4">
            {/* Image Skeleton */}
            <div className="w-24 h-24 bg-gray-700 rounded-md" />

            {/* Course Info */}
            <div className="flex-1">
              <div className="h-5 bg-gray-600 w-1/4 rounded mb-2" />
              <div className="h-4 bg-gray-700 w-1/6 rounded mb-2" />
              <div className="h-2 bg-gray-600 w-1/2 rounded mb-4" />

              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-800 rounded overflow-hidden">
                <div className="h-full bg-gray-600 w-2/3" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 w-48">
              <div className="h-10 bg-blue-700 rounded" />
              {index === 2 && (
                <div className="h-10 bg-purple-700 rounded" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollmentSkeleton ;
