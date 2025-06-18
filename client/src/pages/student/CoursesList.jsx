 

import React, { useEffect, useState } from 'react';
import Footer from '../../components/student/Footer';
import { assets } from '../../assets/assets';
import CourseCard from '../../components/student/CourseCard';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/student/SearchBar';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://onlinelearning-rohit.vercel.app';  

const CoursesList = () => {
  const { input } = useParams();
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]); // ✅ Manage state locally
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/course/all`);
        if (data.success) {
          setAllCourses(data.courses);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = [...allCourses];
      if (input) {
        setFilteredCourse(
          tempCourses.filter((item) =>
            item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        );
      } else {
        setFilteredCourse(tempCourses);
      }
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left bg-gray-800 text-gray-200">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-white">Course List</h1>
            <p className="text-gray-400">
              <span onClick={() => navigate('/')} className="text-blue-500 cursor-pointer">
                Home
              </span>{' '}
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
            <p>{input}</p>
            <img
              onClick={() => navigate('/course-list')}
              className="cursor-pointer"
              src={assets.cross_icon}
              alt="clear"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-4">
          {filteredCourse.length > 0 ? (
            filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className="text-center text-xl text-gray-400 col-span-full">No courses found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
