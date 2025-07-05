import React, { useState, useEffect } from 'react';

const CourseCardSkeleton = () => {
  return (
    <div className="flex items-center p-4 border-b border-gray-700 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-20 h-20 bg-gray-700 rounded-md mr-4" />

      {/* Text Skeleton */}
      <div className="flex-1 space-y-2">
        <div className="w-1/3 h-4 bg-gray-700 rounded" />
        <div className="w-1/2 h-3 bg-gray-700 rounded" />
        <div className="flex justify-between items-center mt-2">
          <div className="w-16 h-3 bg-gray-700 rounded" />
          <div className="w-8 h-3 bg-gray-700 rounded" />
          <div className="w-20 h-3 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      // Simulate fetching data
      setCourses([
        {
          id: '1',
          title: 'DATA BASE',
          courseId: '68668e8cbb8eecf9f876a61d',
          earnings: '$3600000',
          students: 3,
          publishedOn: '3/7/2025',
        },
        {
          id: '2',
          title: 'dvddfd',
          courseId: '6867e0d70d1680e5cd4a9b30',
          earnings: '$22',
          students: 1,
          publishedOn: '4/7/2025',
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {loading ? (
        <>
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </>
      ) : (
        courses.map(course => (
          <div
            key={course.id}
            className="flex items-center p-4 border-b border-gray-700"
          >
            {/* Placeholder Image */}
            <div className="w-20 h-20 bg-gray-800 rounded-md mr-4" />

            {/* Course Info */}
            <div className="flex-1">
              <h2 className="text-lg font-bold">{course.title}</h2>
              <p className="text-sm text-gray-400">Course ID: {course.courseId}</p>
              <div className="flex justify-between text-sm mt-2 text-green-400">
                <span>Earnings: {course.earnings}</span>
                <span>Students: {course.students}</span>
                <span>Published: {course.publishedOn}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseList;
