

import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from '../../components/student/CourseCard';
import AllCourses from '../../pages/SkeletonLoadingUi/AllCourses1';

const AllCoursesPage = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-10 px-4 md:px-20 text-gray-200 w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-green-500 mb-2">All Courses</h2>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Explore all available courses and find the ones that fit your learning journey.
        </p>
      </div>

      {allCourses?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      ) : (
        <AllCourses />
      )}
    </div>
  );
};

export default AllCoursesPage;
