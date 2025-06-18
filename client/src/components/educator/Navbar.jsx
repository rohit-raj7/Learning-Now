 

import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { updateEducatorProfileImageAPI } from '../../api/ApiEducator';
import { assets } from '../../assets/assets.js';

const Navbar = ({ bgColor = 'bg-[#112d46]' }) => {
  const {
    educator,
    user,
    logout,
    educatorData,
  } = useContext(AppContext);

  const isEducator = Boolean(educator);
  const isUser = Boolean(user);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(
    user?.mobile || educator?.mobile || ''
  );

  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null); // For detecting outside clicks

  const toggleDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const userName = user?.fullName || user?.name || user?.email;
  const educatorName = educatorData?.fullName || educatorData?.name || educatorData?.email || educator?.name || educator?.fullName || educator?.email || "Educator";
  const name = userName || educatorName || "User";

  const profileImgSrc = assets.default_user;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const updated = await updateEducatorProfileImageAPI(formData);
      if (updated?.profileImage) {
        setEducatorData((prev) => ({ ...prev, profileImage: updated.profileImage }));
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  const handleMobileUpdate = async () => {
    try {
      console.log('Updated mobile number:', mobileNumber);
      // Optional: call API to update number
    } catch (error) {
      console.error('Error updating mobile:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (isEducator || isUser) ? (
    <div className={`flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3 ${bgColor}`}>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-16 cursor-pointer" />
      </Link>
      <Link to='/'><p className='text-[17px] text-gray-100 hover:text-blue-300'>Home</p></Link>

      <div className="flex items-center gap-6 text-gray-500 relative">
        {isEducator && (
          <Link to="/educator" className="text-cyan-400 hover:underline hidden sm:inline">
            Dashboard
          </Link>
        )}
        <p className="text-white">Hi! {educatorName || userName || name}</p>

        <img
          src={profileImgSrc}
          alt="Profile"
          onClick={toggleDropdown}
          className="w-10 h-10 rounded-full border-2 border-cyan-500 cursor-pointer object-cover"
        />

        {showProfileDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-14 right-0 w-80 z-50 p-5 bg-gray-900 text-gray-100 rounded-xl shadow-xl border border-gray-700"
          >
            {/* Profile Summary */}
            <div className="flex flex-col items-center gap-3 mb-5">
              <img
                src={profileImgSrc}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500 shadow-lg"
              />
              <h2 className="text-xl font-semibold">{educatorName}</h2>
              <p className="text-gray-300">{educatorData?.email}</p>
              <div className="text-gray-300 space-y-1 text-center mt-1">
                <p><span className="font-semibold text-cyan-400">Role:</span> {educatorData?.role || 'Educator'}</p>
                <p><span className="font-semibold text-cyan-400">Total Courses:</span> {educatorData?.totalCourses || educatorData?.courses?.length || 0}</p>
              </div>
            </div>

            <hr className="border-gray-700 my-4" />

            {/* Upload Profile Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-200 mb-1">Change Profile Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm bg-gray-800 border border-gray-600 rounded-md px-2 py-1 text-gray-100 file:mr-2 file:py-1 file:px-3 file:border-none file:rounded file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 transition"
              />
            </div>

            {/* Mobile Number Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-200 mb-1">Mobile Number</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={handleMobileUpdate}
                className="mt-2 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Update Information
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default Navbar;
