// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../../context/AppContext'
// import YouTube from 'react-youtube';
// import { assets } from '../../assets/assets';
// import { useParams } from 'react-router-dom';
// import humanizeDuration from 'humanize-duration';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Rating from '../../components/student/Rating';
// import Footer from '../../components/student/Footer';
// import Loading from '../../components/student/Loading';

// const Player = ({ }) => {
 
//   const API_URL = "http://localhost:3001";
//   const token = localStorage.getItem('token');

//   const { enrolledCourses, calculateChapterTime, userData, fetchUserEnrolledCourses } = useContext(AppContext)

//   const { courseId } = useParams()
//   const [courseData, setCourseData] = useState(null)
//   const [progressData, setProgressData] = useState(null)
//   const [openSections, setOpenSections] = useState({});
//   const [playerData, setPlayerData] = useState(null);
//   const [initialRating, setInitialRating] = useState(0);

//   const getCourseData = () => {
//     enrolledCourses.map((course) => {
//       if (course._id === courseId) {
//         setCourseData(course)
//         course.courseRatings.map((item) => {
//           if (item.userId === userData._id) {
//             setInitialRating(item.rating)
//           }
//         })
//       }
//     })
//   }

//   const toggleSection = (index) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };


//   useEffect(() => {
//     if (enrolledCourses.length > 0) {
//       getCourseData()
//     }
//   }, [enrolledCourses])

//   const markLectureAsCompleted = async (lectureId) => {

//     try {
      
//       const { data } = await axios.post(API_URL + '/api/user/update-course-progress',
//         { courseId, lectureId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )

//       if (data.success) {
//         toast.success(data.message)
//         getCourseProgress()
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }

//   }

//   const getCourseProgress = async () => {

//     try { 
//       const { data } = await axios.post(API_URL + '/api/user/get-course-progress',
//         { courseId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )

//       if (data.success) {
//         setProgressData(data.progressData)
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }

//   }

//   const handleRate = async (rating) => {

//     try { 
//       const { data } = await axios.post(API_URL + '/api/user/add-rating',
//         { courseId, rating },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )

//       if (data.success) {
//         toast.success(data.message)
//         fetchUserEnrolledCourses()
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {

//     getCourseProgress()

//   }, [])

//   return courseData ? (
//     <>
    
//     <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36 bg-gray-800 text-gray-100' >
//       <div className=" text-gray-800" >
//         <h2 className="text-xl font-semibold">Course Structure</h2>
//         <div className="pt-5">
//           {courseData && courseData.courseContent.map((chapter, index) => (
//             <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
//               <div
//                 className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
//                 onClick={() => toggleSection(index)}
//               >
//                 <div className="flex items-center gap-2">
//                   <img src={assets.down_arrow_icon} alt="arrow icon" className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""}`} />
//                   <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
//                 </div>
//                 <p className="text-sm md:text-default">{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
//               </div>

//               <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-96" : "max-h-0"}`} >
//                 <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
//                   {chapter.chapterContent.map((lecture, i) => (
//                     <li key={i} className="flex items-start gap-2 py-1">
//                       <img src={progressData && progressData.lectureCompleted.includes(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon} alt="bullet icon" className="w-4 h-4 mt-1" />
//                       <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
//                         <p>{lecture.lectureTitle}</p>
//                         <div className='flex gap-2'>
//                           {lecture.lectureUrl && <p onClick={() => setPlayerData({ ...lecture, chapter: index + 1, lecture: i + 1 })} className='text-blue-500 cursor-pointer'>Watch</p>}
//                           <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className=" flex items-center gap-2 py-3 mt-10">
//           <h1 className="text-xl font-bold">Rate this Course:</h1>
//           <Rating initialRating={initialRating} onRate={handleRate} />
//         </div>

//       </div>

//       <div className='md:mt-10'>
//         {
//           playerData
//             ? (
//               <div>
//                 <YouTube iframeClassName='w-full aspect-video' videoId={playerData.lectureUrl.split('/').pop()} />
//                 <div className='flex justify-between items-center mt-1'>
//                   <p className='text-xl '>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
//                   <button onClick={() => markLectureAsCompleted(playerData.lectureId)} className='text-blue-600'>{progressData && progressData.lectureCompleted.includes(playerData.lectureId) ? 'Completed' : 'Mark Complete'}</button>
//                 </div>
//               </div>
//             )
//             : <img src={courseData ? courseData.courseThumbnail : ''} alt="" />
//         }
//       </div>
//     </div>
//     <Footer />
//     </>
//   ) : <Loading />
// }

// export default Player





import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import YouTube from 'react-youtube';
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';
import axios from 'axios';
import { toast } from 'react-toastify';
import Rating from '../../components/student/Rating';
import Footer from '../../components/student/Footer';
import Loading from '../../components/student/Loading';

const Player = () => {
  const API_URL = "http://localhost:3001";
  const token = localStorage.getItem('token');

  const { enrolledCourses, calculateChapterTime, userData, fetchUserEnrolledCourses } = useContext(AppContext);
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

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

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses]);

  useEffect(() => {
    getCourseProgress();
  }, []);

  if (!courseData) return <Loading />;

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

          {/* Rating */}
          <div className="mt-10 flex items-center gap-3">
            <h3 className="text-xl font-semibold">Rate this course:</h3>
            <Rating initialRating={initialRating} onRate={handleRate} />
          </div>
        </div>

        {/* Video Player or Thumbnail */}
        <div className="md:mt-10">
          {playerData ? (
            <>
              <YouTube
                videoId={playerData.lectureUrl.split('/').pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-lg font-medium">
                  {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                </p>
                <button
                  onClick={() => markLectureAsCompleted(playerData.lectureId)}
                  className="text-blue-500 hover:text-blue-400"
                >
                  {progressData?.lectureCompleted.includes(playerData.lectureId)
                    ? 'Completed'
                    : 'Mark Complete'}
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
