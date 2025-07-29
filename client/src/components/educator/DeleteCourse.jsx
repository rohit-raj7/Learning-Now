import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteCourseButton = () => {
  const [courseId, setCourseId] = useState('');
  const { API_URL } = useContext(AppContext);

  const handleDelete = async () => {
    if (!courseId.trim()) {
      toast.warning('Please enter a valid Course ID');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const res = await axios.delete(
        `${API_URL}/api/delete/delete-course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || 'Course deleted successfully');
      setCourseId('');
    } catch (err) {
      console.error('Error deleting course:', err);
      const errorMessage =
        err.response?.data?.message || 'Failed to delete course';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-4 bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-2xl">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">🗑️ Delete a Course</h2>

      <input
        type="text"
        placeholder="Enter Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 mb-5 transition"
      />

      <button
        onClick={handleDelete}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold shadow-md hover:scale-105 transform transition"
      >
        Confirm Delete
      </button>
    </div>
  );
};

export default DeleteCourseButton;
