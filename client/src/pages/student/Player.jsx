


import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';
import axios from 'axios';
import { toast } from 'react-toastify';
import Rating from '../../components/student/Rating';
import Footer from '../../components/student/Footer';
import VideoPlayer from '../../pages/SkeletonLoadingUi/VideoPlayer'; 

const Player = () => {
  const token = localStorage.getItem('token');

  const {
    enrolledCourses,
    calculateChapterTime,
    API_URL,
    userData,
    fetchUserEnrolledCourses
  } = useContext(AppContext);

  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);
  const [comment, setComment] = useState('');

  const getCourseData = () => {
    enrolledCourses.forEach((course) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings?.forEach((rating) => {
          if (rating.userId === userData._id) {
            setInitialRating(rating.rating);
          }
        });
      }
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/update-course-progress`,
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/get-course-progress`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/add-rating`,
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserEnrolledCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      toast.success("Comment submitted!");
      setComment('');
    } catch (error) {
      toast.error("Failed to submit comment.");
    }
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses]);

  useEffect(() => {
    getCourseProgress();
  }, []);

  if (!courseData) return <VideoPlayer />;

  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36 bg-gray-800 text-gray-100">

        {/* Course Structure */}
        <div className="text-gray-100">
          <h2 className="text-2xl font-bold mb-4">Course Structure</h2>
          <div className="pt-2">
            {courseData.courseContent?.map((chapter, index) => (
              <div key={index} className="border border-gray-600 bg-gray-900 mb-3 rounded-lg">
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer select-none hover:bg-gray-800"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={assets.down_arrow_icon}
                      alt="arrow"
                      className={`w-4 h-4 transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                    />
                    <p className="font-medium text-base">{chapter.chapterTitle}</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    {chapter.chapterContent.length} lectures • {calculateChapterTime(chapter)}
                  </p>
                </div>

                <div className={`transition-all duration-300 ${openSections[index] ? 'max-h-[1000px]' : 'max-h-0 overflow-hidden'}`}>
                  <ul className="pl-6 pr-5 py-3 text-gray-200 border-t border-gray-700">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              progressData?.lectureCompleted.includes(lecture.lectureId)
                                ? assets.blue_tick_icon
                                : assets.play_icon
                            }
                            alt="icon"
                            className="w-4 h-4"
                          />
                          <p>{lecture.lectureTitle}</p>
                        </div>

                        <div className="flex items-center gap-4">
                          {lecture.lectureUrl && (
                            <button
                              onClick={() =>
                                setPlayerData({
                                  ...lecture,
                                  chapter: index + 1,
                                  lecture: i + 1,
                                })
                              }
                              className="text-blue-500 hover:text-blue-400 transition"
                            >
                              Watch
                            </button>
                          )}
                          <span className="text-gray-400">
                            {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                              units: ['h', 'm'],
                              round: true,
                            })}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Course Completion */}
          {progressData?.completed && (
            <div className="bg-green-100 text-green-800 font-medium p-4 rounded-md mt-6 shadow-md">
              🎉 You’ve completed this course on{' '}
              <strong>{new Date(progressData.completedAt || new Date()).toLocaleDateString()}</strong>!
            </div>
          )}

          {/* Rating and Comment Section */}
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl text-gray-200">Rate this course:</h3>
              <Rating initialRating={initialRating} onRate={handleRate} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="comment" className="text-lg text-green-500 font-medium">Leave a comment or enquiry:</label>
              <textarea
                id="comment"
                rows="4"
                className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your comment or question here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="self-start bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md mt-2"
                onClick={handleCommentSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Video Player or Thumbnail */}
        <div className="md:mt-10">
          {playerData ? (
            <>
              <video
                src={playerData.lectureUrl}
                className="w-full aspect-video rounded-lg"
                controls
                autoPlay
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-lg font-medium">
                  {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                </p>
                <button
                  onClick={() => markLectureAsCompleted(playerData.lectureId)}
                  className="text-blue-500 hover:text-blue-400"
                >
                  {progressData?.lectureCompleted.includes(playerData.lectureId) ? (
                    <>
                      🎉 Completed on{' '}
                      <strong>{new Date(progressData.completedAt || new Date()).toLocaleDateString()}</strong>
                    </>
                  ) : (
                    'Mark Complete'
                  )}
                </button>
              </div>
            </>
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt="Course thumbnail"
              className="w-full rounded-lg shadow"
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;




 