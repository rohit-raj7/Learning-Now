


import React, { useContext } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';

import Navbar from './components/student/Navbar'; 

import Home from './pages/student/Home';
import PrivacyPolicy from './components/student/PrivacyPolicy';
import Loading from './components/student/Loading';

// Student Auth
import SignupUser from './components/student/Login-Signup/Signup.jsx';
import LoginUser from './components/student/Login-Signup/Login.jsx';
import ForgotPasswordUser from './components/student/Login-Signup/ForgotPassword.jsx';

// Educator Auth
// import SignupEducator from './components/educator/Login-Signup/Signup.jsx';
// import LoginEducator from './components/educator/Login-Signup/Login.jsx';
import ForgotPasswordEducator from './components/educator/Login-Signup/ForgotPassword.jsx';

import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Educator from './pages/educator/Educator'
import Player from './pages/student/Player'
import MyEnrollments from './pages/student/MyEnrollments'
import CourseDetails from './pages/student/CourseDetails'
import CoursesList from './pages/student/CoursesList'

import 'quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Student from './pages/student/Student.jsx';
import EducatorProfile from './components/educator/EducatorProfile.jsx';
import CertificateGenerator from './pages/student/Ceritficate.jsx'

const App = () => {
  const isEducatorRoute = useMatch('/educator/*'); 

  return (
    <div className="text-default min-h-screen bg-gray-800">
      <ToastContainer />
 
      
{!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Privacy_Policy" element={<PrivacyPolicy />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* Student Auth Routes */}
        <Route path="/user/signup" element={<SignupUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/user/forgot-password" element={<ForgotPasswordUser />} />

        {/* Educator Auth Routes */}
        {/* <Route path="/educator/signup" element={<SignupEducator />} />
        <Route path="/educator/login" element={<LoginEducator />} /> */}
        <Route path="/educator/forgot-password" element={<ForgotPasswordEducator />} />

       <Route path='/user' element={<Student/>}/>
         <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/user/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/certificate/:courseId" element={<CertificateGenerator />} />

       
       
         <Route path='/educator' element={<Educator />}>
          <Route path='/educator' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
          <Route path="/educator-profile" element={<EducatorProfile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
 
 


 