

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const API_URL = "http://localhost:3001"
  const currency = '$';

  const navigate = useNavigate();


  const [showLogin, setShowLogin] = useState(false);
  const [isEducator, setIsEducator] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState('');
  const [educator, setEducator] = useState('');
  const [educatorData, setEducatorData] = useState(null); // ✅ added
  const [enrolledCourses, setEnrolledCourses] = useState([]);



  // ✅ Logout functions
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    toast.success("User logged out!");
    navigate("/");
    window.location.reload();
  };

  const logoutEducator = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("educator");
    setIsEducator(false);
    setEducatorData(null); // ✅ added
    toast.success("Educator logged out!");
    navigate("/");
    window.location.reload();
  };

  const logout = () => {
    logoutUser();
    logoutEducator();
  };

  // fetchUserData 

  const fetchUserData = async () => {
    try {
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(API_URL + '/api/user/data', headers);
      const result = await response.json();
      console.log("📥 User data fetched:", result);
      setUser(result)
    } catch (error) {
      toast.error(error.message);
    }
  }


  // ✅ Fetch educator data
  const fetchEducatorData = async () => {
    try {
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(API_URL + '/api/educator/data', headers);
      const result = await response.json();
      console.log(result)
      setEducator(result)
    } catch (error) {
      toast.error(error.message);
    }
  };


  // ✅ Fetch all courses
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(API_URL + "/api/course/all");
      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  // ✅ Fetch enrolled courses
  const fetchUserEnrolledCourses = async () => {
    const headers = {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(API_URL + '/api/user/enrolled-courses', headers);
    const data = await response.json();

    if (data.success) {
      setEnrolledCourses(data.enrolledCourses.reverse());
    } else {
      toast.error(data.message);
    }
  };

  // ✅ Utility functions
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach(
      (lecture) => (time += lecture.lectureDuration)
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) =>
      chapter.chapterContent.forEach(
        (lecture) => (time += lecture.lectureDuration)
      )
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return Math.floor(totalRating / course.courseRatings.length);
  };

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // ✅ Effects
  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserEnrolledCourses();
    }
    if (educator) {
      fetchEducatorData(); // ✅ fetch educator data
    }
  }, [user, educator]);

  const value = {
    showLogin,
    setShowLogin,
    API_URL,
    currency,
    navigate,

    // User
    logout,
    logoutUser,
    user,
    userData,
    setUserData,
    enrolledCourses,
    fetchUserEnrolledCourses,

    // Educator
    logoutEducator,
    educator,
    educatorData,        // ✅ added
    setEducatorData,
    isEducator,
    setIsEducator,

    // Courses
    allCourses,
    fetchAllCourses,
    calculateChapterTime,
    calculateCourseDuration,
    calculateRating,
    calculateNoOfLectures,
  };

  // console.log("🔍 AppContext exported value:", value);

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

