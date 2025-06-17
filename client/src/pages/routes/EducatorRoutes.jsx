import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../educator/Dashboard';
import AddCourse from '../educator/AddCourse';
import Educator from '../educator/Educator';
import MyCourses from '../educator/MyCourses';
import StudentsEnrolled from '../educator/StudentsEnrolled';

const EducatorRoutes = () => {
  return (
    <div className="px-4 py-2">
     <Routes>
        
      <Route   element={<Educator />}></Route>
        <Route path="/educator" element={<Dashboard />} />
        <Route path="add-course" element={<AddCourse />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="student-enrolled" element={<StudentsEnrolled />} />
      </Routes>
    </div>
  );
};

export default EducatorRoutes;



