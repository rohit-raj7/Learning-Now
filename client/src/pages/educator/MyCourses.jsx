

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import CourseList from '../SkeletonLoadingUi/MyEnrollments'

const MyCourses = () => {
  const { API_URL, isEducator, currency } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Token not found. Please login again.");
      return;
    }

    try {
      const { data } = await axios.get(`${API_URL}/api/educator/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  return courses ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 p-4 pt-8">
      <div className="w-full">
        <h2 className="pb-4 text-lg text-gray-100 font-medium">My Courses</h2>


        <div className="hidden md:flex flex-col items-center max-w-6xl w-full overflow-x-auto rounded-lg bg-gray-900 border border-gray-200/20">
          <table className="w-full table-auto text-base">
            <thead className="text-gray-100 border-b border-gray-200/20 text-base text-left">
              <tr>
                <th className="px-6 py-4 text-green-500 font-semibold">All Courses</th>
                <th className="px-6 py-4 font-semibold">Earnings</th>
                <th className="px-6 py-4 text-green-500 font-semibold">Students</th>
                <th className="px-6 py-4 text-green-500 font-semibold">Published On</th>
              </tr>
            </thead>
            <tbody className="text-[16px] text-gray-400">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-200/20">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-5">
                      <img
                        src={course.courseThumbnail}
                        alt="Course"
                        className="w-20 h-20 object-cover rounded-md border border-gray-700"
                      />
                      <div>
                        <p className="text-white font-semibold text-lg">{course.courseTitle}</p>
                        <p className="text-sm text-gray-300 mt-2">
                          Course ID: <span className="text-xs break-all">{course._id}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-green-400 font-medium">
                    {currency}{" "}
                    {Math.floor(
                      course.enrolledStudents.length *
                      (course.coursePrice - (course.discount * course.coursePrice) / 100)
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-200 font-medium">{course.enrolledStudents.length}</td>

                  <td className="px-6 py-4 text-gray-300 font-medium">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* mobile view */}

        <div className="md:hidden flex flex-col space-y-6 mt-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-sm"
            >
              {/* Course Header */}
              <div className="flex items-center gap-4 border-b border-gray-700 pb-3">
                <img
                  src={course.courseThumbnail}
                  alt="Course"
                  className="w-16 h-16 object-cover rounded-md border border-gray-600"
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base">{course.courseTitle}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    <span className="text-[10px] text-gray-400">Course ID: {course._id}</span>
                  </p>

                </div>
              </div>

              {/* Course Info */}
              <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-300">
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span className="text-gray-400">Earnings</span>
                  <span className="font-medium text-green-400">
                    {currency}{" "}
                    {Math.floor(
                      course.enrolledStudents.length *
                      (course.coursePrice - (course.discount * course.coursePrice) / 100)
                    )}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span className="text-gray-400">Students</span>
                  <span className="font-medium">{course.enrolledStudents.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Published On</span>
                  <span className="font-medium">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  ) : (
    <CourseList />
  );
};

export default MyCourses;
