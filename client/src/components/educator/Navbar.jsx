import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { updateEducatorProfileImageAPI } from '../../api/ApiEducator';
import { assets } from '../../assets/assets.js';

const Navbar = ({ bgColor }) => {
  const { educator, user, logout, setUser, setEducator } = useContext(AppContext);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(user?.mobile || educator?.mobile || '');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const updatedUser = await updateEducatorProfileImageAPI(formData);
      if (updatedUser?.profileImage) {
        setUser((prevUser) => ({ ...prevUser, profileImage: updatedUser.profileImage }));
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  const handleMobileUpdate = async () => {
    try {
      console.log('Updated mobile number:', mobileNumber);
      // Add API call to update mobile number here if needed
    } catch (error) {
      console.error('Error updating mobile:', error);
    }
  };

  const toggleDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const profileImgSrc =user?.profileImage || educator?.profileImage || assets.default_user;

  return (educator || user) && (
    <div className={`flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3 ${bgColor}`}>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-20 lg:w-25" />
      </Link>

      <div className="flex items-center gap-5 text-gray-500 relative">
        <p className="text-white">
          Hi! {user?.fullName || user?.name || user?.email ||educator?.fullName || educator?.name || educator?.email}
        </p>

        {/* Show dashboard only for educator */}
        <span className="text-cyan-400 hover:underline hidden sm:inline">
          Dashboard
        </span>

        <img
          src={profileImgSrc}
          alt="Profile"
          onClick={toggleDropdown}
          className="w-10 h-10 rounded-full border-2 border-cyan-500 cursor-pointer object-cover"
        />

        {showProfileDropdown && (
          <div className="absolute top-14 right-0 bg-white shadow-md rounded-lg w-64 z-50 p-4 text-black">
            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 hover:bg-red-500 hover:text-white rounded text-red-700"
            >
              Logout
            </button>

            <div className="mt-2">
              <label className="block mb-1 font-medium">Change Profile Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm"
              />
            </div>

            <div className="mt-3">
              <label className="block mb-1 font-medium">Mobile Number</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
              <button
                onClick={handleMobileUpdate}
                className="bg-blue-600 text-white mt-2 px-3 py-1 rounded"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


 