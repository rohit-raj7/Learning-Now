import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  
  const API_URL='https://onlinelearning-rohit.vercel.app' 
   
  // const API_URL = 'http://localhost:3001';
  
  // const domainURL='https://online-learning-yet.vercel.app'

  const domainURL= window?.location?.hostname?.includes('vercel')
  ? 'https://onlinelearning-rohit.vercel.app'
  : 'https://learningnow.online';

  
  const currency = "$";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isEducator, setIsEducator] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [educatorData, setEducatorData] = useState(null);
  const [user, setUser] = useState("");
  const [educator, setEducator] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const isLoggedIn = Boolean(userData || educatorData);

  useEffect(() => {
    // console.log("User Data:", userData);
    // console.log("Educator Data:", educatorData);
    // console.log("isLoggedIn:", isLoggedIn);
  }, [userData, educatorData]);

 
useEffect(() => {
  const token = localStorage.getItem("token");
  
  const educatorType = localStorage.getItem("educator");
 
  if (token && educatorType) {
    setEducator(educatorType);
    setIsEducator(true); // ✅ FIX: Make sure to set this
  }
}, []);


  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    setUser("");
    toast.success("User logged out!");
    navigate("/");
    window.location.reload();
  };

  const logoutEducator = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("educator");
    setEducatorData(null);
    setEducator("");
    // setIsEducator(false);
    toast.success("Educator logged out!");
    navigate("/");
    window.location.reload();
  };

  const logout = () => {
    logoutUser();
    logoutEducator();
  };

  // const fetchUserData = async () => {
  //   try {

  //     const response = await fetch(`${API_URL}/api/user/data`, {
  //       headers: { Authorization: localStorage.getItem("token") },
  //     });
  //     const result = await response.json();
  //     if (result.success) {
  //       setUserData(result.user);
  //     } else {
  //       toast.error(result.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("🔑 Token from localStorage:", token);

    const response = await fetch(`${API_URL}/api/user/data`, {
      headers: {
        Authorization: token, // keep your current format
      },
    });

    const result = await response.json();
    if (result.success) {
      setUserData(result.user);
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


 const fetchEducatorData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/educator/data`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    const result = await response.json();

    if (result.success) {
      const { _id, name, email, createdAt } = result.educator;

      // ✅ Save only relevant fields explicitly
      setEducatorData({
        _id,
        name,
        email,
        createdAt
      });
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/course/all`);
      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserEnrolledCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/enrolled-courses`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      const data = await response.json();
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
      // console.log(data)
    } catch (error) {
      toast.error(error.message);
    }
  };

   // Function to Calculate Course Chapter Time
    const calculateChapterTime = (chapter) => {

        let time = 0

        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)

        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })

    }

   // Function to Calculate Course Duration
    const calculateCourseDuration = (course) => {

        let time = 0

        course.courseContent.map(
            (chapter) => chapter.chapterContent.map(
                (lecture) => time += lecture.lectureDuration
            )
        )

        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })

    }

   const calculateRating = (course) => {

        if (course.courseRatings.length === 0) {
            return 0
        }

        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return Math.floor(totalRating / course.courseRatings.length)
    }

       const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    }


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("user");
    const educatorType = localStorage.getItem("educator");

    // console.log("Token:", token);
    // console.log("User:", userType);
    // console.log("Educator:", educatorType);

    if (token && userType) setUser(userType);
    if (token && educatorType) setEducator(educatorType);
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserEnrolledCourses();
    }
    if (educator) {
      fetchEducatorData();
    }
  }, [user, educator]);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    showLogin,
    setShowLogin,
    API_URL,
    currency,
    navigate,
    loading,
    isLoggedIn,

    logout,
    logoutUser,
    logoutEducator,

    // User
    user,
    userData,
    setUserData,
    enrolledCourses,
    fetchUserEnrolledCourses,

    // Educator
    educator,
    setEducator,
    educatorData,
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
    domainURL
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};



























// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import humanizeDuration from "humanize-duration";

// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
  
//   const API_URL='https://onlinelearning-rohit.vercel.app' 
   
//   // const API_URL = 'http://localhost:3001';
  
//   // const domainURL='https://online-learning-yet.vercel.app'

//   const domainURL= window?.location?.hostname?.includes('vercel')
//   ? 'https://onlinelearning-rohit.vercel.app'
//   : 'https://learningnow.online';

  
//   const currency = "$";
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [isEducator, setIsEducator] = useState(false);
//   const [allCourses, setAllCourses] = useState([]);
//   const [userData, setUserData] = useState(null);
//   const [educatorData, setEducatorData] = useState(null);
//   const [user, setUser] = useState("");
//   const [educator, setEducator] = useState("");
//   const [enrolledCourses, setEnrolledCourses] = useState([]);

//   const isLoggedIn = Boolean(userData || educatorData);

//   useEffect(() => {
//     // console.log("User Data:", userData);
//     // console.log("Educator Data:", educatorData);
//     // console.log("isLoggedIn:", isLoggedIn);
//   }, [userData, educatorData]);

 
// useEffect(() => {
//   const token = localStorage.getItem("token");
  
//   const educatorType = localStorage.getItem("educator");
 
//   if (token && educatorType) {
//     setEducator(educatorType);
//     setIsEducator(true); // ✅ FIX: Make sure to set this
//   }
// }, []);


//   const logoutUser = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUserData(null);
//     setUser("");
//     toast.success("User logged out!");
//     navigate("/");
//     window.location.reload();
//   };

//   const logoutEducator = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("educator");
//     setEducatorData(null);
//     setEducator("");
//     // setIsEducator(false);
//     toast.success("Educator logged out!");
//     navigate("/");
//     window.location.reload();
//   };

//   const logout = () => {
//     logoutUser();
//     logoutEducator();
//   };

//   const fetchUserData = async () => {
//     try {

//       const response = await fetch(`${API_URL}/api/user/data`, {
//         headers: { Authorization: localStorage.getItem("token") },
//       });
//       const result = await response.json();
//       if (result.success) {
//         setUserData(result.user);
//       } else {
//         toast.error(result.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//  const fetchEducatorData = async () => {
//   try {
//     const response = await fetch(`${API_URL}/api/educator/data`, {
//       headers: { Authorization: localStorage.getItem("token") },
//     });
//     const result = await response.json();

//     if (result.success) {
//       const { _id, name, email, createdAt } = result.educator;

//       // ✅ Save only relevant fields explicitly
//       setEducatorData({
//         _id,
//         name,
//         email,
//         createdAt
//       });
//     } else {
//       toast.error(result.message);
//     }
//   } catch (error) {
//     toast.error(error.message);
//   }
// };


//   const fetchAllCourses = async () => {
//     try {
//       const { data } = await axios.get(`${API_URL}/api/course/all`);
//       if (data.success) {
//         setAllCourses(data.courses);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const fetchUserEnrolledCourses = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/user/enrolled-courses`, {
//         headers: { Authorization: localStorage.getItem("token") },
//       });
//       const data = await response.json();
//       if (data.success) {
//         setEnrolledCourses(data.enrolledCourses.reverse());
//       } else {
//         toast.error(data.message);
//       }
//       // console.log(data)
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//    // Function to Calculate Course Chapter Time
//     const calculateChapterTime = (chapter) => {

//         let time = 0

//         chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)

//         return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })

//     }

//    // Function to Calculate Course Duration
//     const calculateCourseDuration = (course) => {

//         let time = 0

//         course.courseContent.map(
//             (chapter) => chapter.chapterContent.map(
//                 (lecture) => time += lecture.lectureDuration
//             )
//         )

//         return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })

//     }

//    const calculateRating = (course) => {

//         if (course.courseRatings.length === 0) {
//             return 0
//         }

//         let totalRating = 0
//         course.courseRatings.forEach(rating => {
//             totalRating += rating.rating
//         })
//         return Math.floor(totalRating / course.courseRatings.length)
//     }

//        const calculateNoOfLectures = (course) => {
//         let totalLectures = 0;
//         course.courseContent.forEach(chapter => {
//             if (Array.isArray(chapter.chapterContent)) {
//                 totalLectures += chapter.chapterContent.length;
//             }
//         });
//         return totalLectures;
//     }


//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userType = localStorage.getItem("user");
//     const educatorType = localStorage.getItem("educator");

//     // console.log("Token:", token);
//     // console.log("User:", userType);
//     // console.log("Educator:", educatorType);

//     if (token && userType) setUser(userType);
//     if (token && educatorType) setEducator(educatorType);
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchUserData();
//       fetchUserEnrolledCourses();
//     }
//     if (educator) {
//       fetchEducatorData();
//     }
//   }, [user, educator]);

//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   const value = {
//     showLogin,
//     setShowLogin,
//     API_URL,
//     currency,
//     navigate,
//     loading,
//     isLoggedIn,

//     logout,
//     logoutUser,
//     logoutEducator,

//     // User
//     user,
//     userData,
//     setUserData,
//     enrolledCourses,
//     fetchUserEnrolledCourses,

//     // Educator
//     educator,
//     setEducator,
//     educatorData,
//     setEducatorData,
//     isEducator,
//     setIsEducator,

//     // Courses
//     allCourses,
//     fetchAllCourses,
//     calculateChapterTime,
//     calculateCourseDuration,
//     calculateRating,
//     calculateNoOfLectures,
//     domainURL
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };
