import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import MyEnrollmentSkeleton from '../SkeletonLoadingUi/MyEnrollmentSkeleton';

const MyEnrollments = () => {
  const {
    userData,
    enrolledCourses,
    fetchUserEnrolledCourses,
    navigate,
    API_URL,
    calculateCourseDuration,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const [progressArray, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch course progress data
  const getCourseProgress = async () => {
    try {
      const token = localStorage.getItem('token');

      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${API_URL}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData?.lectureCompleted?.length || 0;

          return { totalLectures, lectureCompleted };
        })
      );

      setProgressData(tempProgressArray);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Failed to fetch progress data');
    }
  };

  // Load enrolled courses
  useEffect(() => {
    const loadData = async () => {
      try {
        if (userData) {
          await fetchUserEnrolledCourses();
        }
      } catch (err) {
        toast.error('Failed to load enrolled courses.');
      }
    };

    loadData();
  }, [userData]);

  // Load course progress after courses are fetched
  useEffect(() => {
    const loadProgress = async () => {
      if (enrolledCourses.length > 0) {
        await getCourseProgress();
      }
      setLoading(false);
    };

    loadProgress();
  }, [enrolledCourses]);

  // Show loading screen
  if (loading) {
    return (
      <div>
        <MyEnrollmentSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="md:px-36 px-4 pt-10 bg-gray-800 text-gray-200 min-h-screen">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>

        {enrolledCourses.length === 0 ? (
          <p className="mt-10 text-center text-lg">You are not enrolled in any courses.</p>
        ) : (
          <table className="w-full table-auto border border-gray-200 mt-10">
            <thead className="text-gray-200 border-b border-gray-200 text-sm text-left max-sm:hidden">
              <tr>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold max-sm:hidden">Duration</th>
                <th className="px-4 py-3 font-semibold max-sm:hidden">Completed</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {enrolledCourses.map((course, index) => {
                const progress = progressArray[index] || {
                  totalLectures: 0,
                  lectureCompleted: 0,
                };

                const { totalLectures, lectureCompleted } = progress;

                const percentComplete =
                  totalLectures > 0 ? Math.round((lectureCompleted * 100) / totalLectures) : 0;

                const isCompleted = lectureCompleted >= totalLectures && totalLectures > 0;

                return (
                  <tr key={course._id} className="border-b border-gray-200">
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-14 sm:w-24 md:w-28 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="mb-1 max-sm:text-sm font-medium">{course.courseTitle}</p>
                        <Line
                          className="bg-gray-700 rounded-full"
                          strokeColor="#38bdf8"
                          trailColor="#1f2937"
                          strokeWidth={2}
                          percent={percentComplete}
                        />
                      </div>
                    </td>

                    <td className="px-4 py-3 max-sm:hidden">
                      {calculateCourseDuration(course)}
                    </td>

                    <td className="px-4 py-3 max-sm:hidden">
                      {`${lectureCompleted} / ${totalLectures}`}
                      <span className="text-xs ml-2">Lectures</span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                        <button
                          onClick={() => navigate(`/player/${course._id}`)}
                          className={`flex-1 px-3 py-2 text-sm rounded text-white transition ${
                            isCompleted
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {isCompleted ? 'Completed' : 'On Going'}
                        </button>

                        {isCompleted && (
                          <button
                            onClick={() => navigate(`/certificate/${course._id}`)}
                            className="flex-1 px-3 py-2 text-sm rounded bg-purple-600 hover:bg-purple-700 text-white transition"
                          >
                            Download Certificate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyEnrollments;
