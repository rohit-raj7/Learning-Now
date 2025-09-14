// import React from 'react';
// import { Routes, Route, useMatch } from 'react-router-dom';

// import Navbar from './components/student/Navbar'; 
// import Home from './pages/student/Home';
// import PrivacyPolicy from './components/student/PrivacyPolicy';
// import Loading from './components/student/Loading';

// // Student Auth
// import SignupUser from './components/student/Login-Signup/Signup.jsx';
// import LoginUser from './components/student/Login-Signup/Login.jsx';
// import ForgotPasswordUser from './components/student/Login-Signup/ForgotPassword.jsx';

// // Educator Auth
// import ForgotPasswordEducator from './components/educator/Login-Signup/ForgotPassword.jsx';

// import Dashboard from './pages/educator/Dashboard';
// import AddCourse from './pages/educator/AddCourse';
// import MyCourses from './pages/educator/MyCourses';
// import StudentsEnrolled from './pages/educator/StudentsEnrolled';
// import Educator from './pages/educator/Educator';

// import Player from './pages/student/Player';
// import MyEnrollments from './pages/student/MyEnrollments';
// import CourseDetails from './pages/student/CourseDetails';
// import CoursesList from './pages/student/CoursesList';
// import AllCoursesPage from './components/student/AllCoursesPage.jsx'; // ✅ NEW

// import Student from './pages/student/Student.jsx';
// import EducatorProfile from './components/educator/EducatorProfile.jsx';
// import DeleteCourse from './components/educator/DeleteCourse.jsx';
// import CertificateGenerator from './pages/student/Ceritficate.jsx';
// import VerifyCertificate from './pages/student/VerifyCertificate.jsx';
// import QrVerifyCertificate from './pages/student/QrVerify.jsx';

// import 'quill/dist/quill.snow.css';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';

// const App = () => {
//   const isEducatorRoute = useMatch('/educator/*');

//   return (
//     <div className="text-default min-h-screen bg-gray-800">
//       <ToastContainer />

//       {/* Show Navbar only for student routes */}
//       {!isEducatorRoute && <Navbar />}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/Privacy_Policy" element={<PrivacyPolicy />} />
//         <Route path="/loading/:path" element={<Loading />} />

//         {/* Student Auth */}
//         <Route path="/user/signup" element={<SignupUser />} />
//         <Route path="/user/login" element={<LoginUser />} />
//         <Route path="/user/forgot-password" element={<ForgotPasswordUser />} />

//         {/* Educator Auth */}
//         <Route path="/educator/forgot-password" element={<ForgotPasswordEducator />} />

//         {/* Student App Pages */}
//         <Route path="/user/:userId" element={<Student />} />
//         <Route path="/course/:id" element={<CourseDetails />} />
//         <Route path="/course-list" element={<CoursesList />} />
//         <Route path="/course-list/:input" element={<CoursesList />} />
//         {/* <Route path="/user/my-enrollments" element={<MyEnrollments />} /> */}
//         <Route path="/user/:userId/my-enrollments" element={<MyEnrollments />} />
//         <Route path="/player/:courseId" element={<Player />} />
//         <Route path="/certificate/:courseId" element={<CertificateGenerator />} />
//          <Route path="/qr/:certificateId" element={<QrVerifyCertificate />} />
//         <Route path="/verify-certificate" element={<VerifyCertificate />} />
//         <Route path="/all-courses" element={<AllCoursesPage />} /> {/* ✅ NEW */}
 
//         <Route path="/educator/:educatorId" element={<Educator />}>
//           <Route path="/educator/:educatorId" element={<Dashboard />} />
//           <Route path="/educator/:educatorId/add-course" element={<AddCourse />} />
//           <Route path="/educator/:educatorId/my-courses" element={<MyCourses />} />
//           <Route path="/educator/:educatorId/student-enrolled" element={<StudentsEnrolled />} />
//           <Route path="/educator/:educatorId/educator-profile" element={<EducatorProfile />} />
//            <Route path="/educator/:educatorId/delete-course" element={<DeleteCourse />} />
//         </Route>
        
//       </Routes>
//     </div>
//   );
// };

// export default App;













import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import Navbar from "./components/student/Navbar";
import Home from "./pages/student/Home";
import PrivacyPolicy from "./components/student/PrivacyPolicy";
import Loading from "./components/student/Loading";

// Student Auth
import SignupUser from "./components/student/Login-Signup/Signup.jsx";
import LoginUser from "./components/student/Login-Signup/Login.jsx";
import ForgotPasswordUser from "./components/student/Login-Signup/ForgotPassword.jsx";

// Educator Auth
import ForgotPasswordEducator from "./components/educator/Login-Signup/ForgotPassword.jsx";

import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import Educator from "./pages/educator/Educator";

import Player from "./pages/student/Player";
import MyEnrollments from "./pages/student/MyEnrollments";
import CourseDetails from "./pages/student/CourseDetails";
import CoursesList from "./pages/student/CoursesList";
import AllCoursesPage from "./components/student/AllCoursesPage.jsx"; // ✅ NEW

import Student from "./pages/student/Student.jsx";
import EducatorProfile from "./components/educator/EducatorProfile.jsx";
import DeleteCourse from "./components/educator/DeleteCourse.jsx";
import CertificateGenerator from "./pages/student/Ceritficate.jsx";
import VerifyCertificate from "./pages/student/VerifyCertificate.jsx";
import QrVerifyCertificate from "./pages/student/QrVerify.jsx";

import "quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import InterviewNow from "./pages/interviewNow.jsx";

const App = () => {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-gray-800">
      <ToastContainer />

      {/* Show Navbar only for student routes */}
      {!isEducatorRoute && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Privacy_Policy" element={<PrivacyPolicy />} />
        <Route path="/loading/:path" element={<Loading />} />
        {/* interviewNew */}
        <Route path="/interviewnow" element={<InterviewNow />} />
         
        {/* Student Auth */}
        <Route path="/user/signup" element={<SignupUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/user/forgot-password" element={<ForgotPasswordUser />} />
        {/* Educator Auth */}
        <Route
          path="/educator/forgot-password"
          element={<ForgotPasswordEducator />}
        />
        {/* Student App Pages */}
        <Route path="/user/:userId" element={<Student />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        {/* <Route path="/user/my-enrollments" element={<MyEnrollments />} /> */}
        <Route
          path="/user/:userId/my-enrollments"
          element={<MyEnrollments />}
        />
        <Route path="/player/:courseId" element={<Player />} />
        <Route
          path="/certificate/:courseId"
          element={<CertificateGenerator />}
        />
        <Route path="/qr/:certificateId" element={<QrVerifyCertificate />} />
        <Route path="/verify-certificate" element={<VerifyCertificate />} />
        <Route path="/all-courses" element={<AllCoursesPage />} />{" "}
        {/* ✅ NEW */}
        <Route path="/educator/:educatorId" element={<Educator />}>
          <Route path="/educator/:educatorId" element={<Dashboard />} />
          <Route
            path="/educator/:educatorId/add-course"
            element={<AddCourse />}
          />
          <Route
            path="/educator/:educatorId/my-courses"
            element={<MyCourses />}
          />
          <Route
            path="/educator/:educatorId/student-enrolled"
            element={<StudentsEnrolled />}
          />
          <Route
            path="/educator/:educatorId/educator-profile"
            element={<EducatorProfile />}
          />
          <Route
            path="/educator/:educatorId/delete-course"
            element={<DeleteCourse />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
