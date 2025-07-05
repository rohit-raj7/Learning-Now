import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Loading from '../educator/Login-Signup/Loading';
import AllCourses from '../../pages/SkeletonLoadingUi/AllCourses';
import { useNavigate } from 'react-router-dom';

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);
  const scrollRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <div className="py-10 px-4 md:px-20 text-gray-200 w-full">
      {/* Hide scrollbar via CSS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-green-500">
          Learn from Real-World Pros
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-6 mx-auto">
          Our instructors aren’t just teachers—they’re industry leaders. Start learning skills that matter in today’s job market.
        </p>
      </div>

      {/* View All Mode */}
      {showAll ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCourses && allCourses.length > 0 ? (
            allCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <div className="flex items-center justify-center w-full py-6 gap-4">
              {/* <span>Loading...</span> */}
              <AllCourses />
            </div>
          )}
        </div>
      ) : (
        <>
          {/* ---------- Desktop & Large Screens: Scrollable Row ---------- */}
          <div className="hidden lg:block relative w-full">
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-green-600 hover:bg-green-700 rounded-full shadow-md"
            >
              <ChevronLeft className="text-white w-5 h-5" />
            </button>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 px-6 no-scrollbar scroll-smooth"
            >
              {allCourses && allCourses.length > 0 ? (
                allCourses.map((course, index) => (
                  <div
                    key={index}
                    className="min-w-[22%] max-w-[22%] flex-shrink-0"
                  >
                    <CourseCard course={course} />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-full py-6 gap-4">
              
                  {/* <span>Loading...</span> */}
                  <AllCourses />
                </div>
              )}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-green-600 hover:bg-green-700 rounded-full shadow-md"
            >
              <ChevronRight className="text-white w-5 h-5" />
            </button>
          </div>

          {/* ---------- Mobile & Tablets: 1 to 2 columns ---------- */}
          <div className="block lg:hidden overflow-x-auto px-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allCourses && allCourses.length > 0 ? (
                allCourses.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))
              ) : (
                <div className="flex items-center justify-center w-full py-6 gap-4">
                  {/* <span>Loading...</span> */}
                  <AllCourses />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* View All Button */}
      {/* {!showAll && allCourses?.length > 4 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md transition"
          >
            View All Courses
          </button>
        </div> */}
      {/* )} */}

      {/* View All Button */}
      {allCourses?.length > 4 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/all-courses')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md transition"
          >
            View All Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesSection;
