import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/student/Footer';
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Loading from '../../components/student/Loading';

const CourseDetails = () => {
  const { id } = useParams();
  const API_URL = 'https://onlinelearning-rohit.vercel.app';

  const [courseData, setCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const {
    currency,
    userData,
    calculateChapterTime,
    calculateCourseDuration,
    calculateRating,
    calculateNoOfLectures,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/course/${id}`);
        if (data.success) {
          setCourseData(data.courseData);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
    if (userData?.enrolledCourses && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const enrollCourse = async () => {
    try {
      if (!userData) return toast.warn('Login to Enroll');
      if (isAlreadyEnrolled) return toast.warn('Already Enrolled');

      const token = localStorage.getItem('token');

      const { data } = await axios.post(
        `${API_URL}/api/user/purchase`,
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!courseData) return <Loading />;

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left bg-gray-800 text-gray-100">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gray-800"></div>

        {/* Course Info */}
        <div className="max-w-xl z-10">
          <h1 className="md:text-4xl text-2xl font-semibold text-gray-200">{courseData.courseTitle}</h1>
          <p className="pt-4 md:text-base text-sm" dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }} />

          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
            <p>{calculateRating(courseData)}</p>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' className='w-3.5 h-3.5' />
              ))}
            </div>
            <p className='text-blue-600'>({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>
            <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
          </div>

          <p className='text-sm'>Course by <span className='text-blue-600 underline'>{courseData.educator?.name}</span></p>

          {/* Course Structure */}
          {/* <div className="pt-8">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="border border-gray-200 bg-gray-800 mb-2 rounded">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img src={assets.down_arrow_icon} alt="arrow icon" className={`transition-transform ${openSections[index] ? "rotate-180" : ""}`} />
                      <p className="font-medium text-sm md:text-base">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm">{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-96" : "max-h-0"}`}>
                    <ul className="list-disc pl-5 pr-4 py-2 text-sm border-t border-gray-300 text-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img src={assets.play_icon} alt="bullet icon" className="w-4 h-4 mt-1" />
                          <div className="flex justify-between w-full text-xs md:text-sm text-gray-200">
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {(lecture.isPreviewFree || isAlreadyEnrolled) && (
                                <p
                                  onClick={() => setPlayerData({ videoId: lecture.lectureUrl.split('/').pop() })}
                                  className='text-blue-500 cursor-pointer'
                                >
                                  {isAlreadyEnrolled ? 'Watch Lecture' : 'Preview'}
                                </p>
                              )}

                              <p>{humanizeDuration(lecture.lectureDuration * 60000, { units: ['h', 'm'], round: true })}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <div className="pt-12">
            <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-6">Course Structure</h2>

            <div className="space-y-4">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-sm transition-all duration-300"
                >
                  {/* Chapter Header */}
                  <div
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={assets.down_arrow_icon}
                        alt="Expand"
                        className={`w-4 h-4 transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                      />
                      <p className="text-lg font-medium text-gray-100">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      {chapter.chapterContent.length} lecture{chapter.chapterContent.length > 1 ? 's' : ''} · {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  {/* Chapter Lectures */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${openSections[index] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      } overflow-hidden border-t border-gray-700 bg-gray-800`}
                  >
                    <ul className="py-4 px-6 space-y-3">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                          <img src={assets.play_icon} alt="Play" className="w-4 h-4 mt-1" />
                          <div className="flex justify-between items-center w-full border-b border-gray-700 pb-2">
                            <p className="text-gray-200 font-medium">{lecture.lectureTitle}</p>
                            <div className="flex gap-4 items-center text-xs md:text-sm">
                              {(lecture.isPreviewFree || isAlreadyEnrolled) ? (
                                <button
                                  onClick={() => setPlayerData({ videoId: lecture.lectureUrl.split('/').pop() })}
                                  className="text-blue-400 hover:text-blue-500 underline transition-colors"
                                >
                                  {isAlreadyEnrolled ? 'Watch Lecture' : 'Preview'}
                                </button>
                              ) : (
                                <span
                                  className="text-red-500 font-bold cursor-pointer"
                                  onClick={() => toast.info("Please enroll in the course")}
                                >
                                  Locked
                                </span>

                              )}
                              <span className="text-gray-400">
                                {humanizeDuration(lecture.lectureDuration * 60000, {
                                  units: ['h', 'm'],
                                  round: true,
                                })}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>





          {/* Course Description */}
          <div className="py-20 text-sm">
            <h3 className="text-xl font-semibold text-gray-100">Course Description</h3>
            <p className="pt-3 text-gray-300" dangerouslySetInnerHTML={{ __html: courseData.courseDescription }} />
          </div>
        </div>

        {/* Sidebar: Player + Price */}
        <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none bg-gray-800 border border-gray-500 min-w-[300px] sm:min-w-[420px]">
          {playerData
            ? <YouTube videoId={playerData.videoId} opts={{ playerVars: { autoplay: 1 } }} className='w-full aspect-video' />
            : <img src={courseData.courseThumbnail} alt="thumbnail" className="w-full" />
          }

          <div className="p-5">
            <div className="flex items-center gap-2">
              <img className="w-3.5" src={assets.time_left_clock_icon} alt="clock" />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text-2xl md:text-4xl font-semibold text-gray-300">
                {currency}{(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
              </p>
              <p className="text-lg line-through text-gray-200">{currency}{courseData.coursePrice}</p>
              <p className="text-lg text-gray-200">{courseData.discount}% off</p>
            </div>

            <div className="flex items-center gap-4 pt-4 text-sm text-gray-200">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <button onClick={enrollCourse} className="w-full py-3 mt-6 rounded bg-blue-600 text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="text-lg font-medium text-gray-100">What's in the course?</p>
              <ul className="ml-4 pt-2 list-disc text-sm text-gray-300">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        toastClassName={() =>
          "bg-black text-white px-4 py-3 rounded shadow-lg"
        }
      />

      <Footer />
    </>
  );
};

export default CourseDetails;

