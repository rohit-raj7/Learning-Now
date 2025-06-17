// src/routes/UserRoutes.jsx
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import MyEnrollments from './../student/MyEnrollments'
import CourseDetails from './../student/CourseDetails';
import CoursesList from './../student/CoursesList';
import Player from './../student/Player';

const UserRoutes = () => {
  

  return (
    <div className="px-4 py-2">
      
      <Routes>
        <Route path="my-enrollments" element={<MyEnrollments />} />
        <Route path="course/:id" element={<CourseDetails />} />
        <Route path="course-list" element={<CoursesList />} />
        <Route path="course-list/:input" element={<CoursesList />} />
        <Route path="player/:courseId" element={<Player />} />
      </Routes>
    </div>
  );
};

export default UserRoutes; 