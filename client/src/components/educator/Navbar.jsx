 
 import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { updateEducatorProfileImageAPI } from '../../api/ApiEducator';
import { assets } from '../../assets/assets.js';

const Navbar = ({ bgColor = 'bg-[#112d46]' }) => {
  const {
    educator,
    user,
    logout, educatorData,
  } = useContext(AppContext);

  const isEducator = Boolean(educator);
  const isUser = Boolean(user);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(
    user?.mobile || educator?.mobile || ''
  );

  const fileInputRef = useRef(null);

  const toggleDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };
const userName = user?.fullName || user?.name || user?.email;
const educatorName = educatorData?.fullName || educatorData?.name || educatorData?.email || educator.name || educator.fullName || educator.email || "Educator";
const name = userName || educatorName || "User";
console.log("EducatorData:", educatorData);
console.log("Educator:", educator);

const profileImgSrc =
  user?.profileImage ||
  educatorData?.profileImage ||
  user?.imageUrl ||
  educatorData?.imageUrl ||
  assets.default_user;

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
      // Optionally implement API call for updating mobile number
    } catch (error) {
      console.error('Error updating mobile:', error);
    }
  };

  return (isEducator || isUser) ? (
    <div className={`flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3 ${bgColor}`}>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-16 cursor-pointer" />
      </Link>

      <div className="flex items-center gap-5 text-gray-500 relative">
        <p className="text-white">
          Hi! {educatorName || userName || name} </p>

        {isEducator && (
          <Link to="/educator" className="text-cyan-400 hover:underline hidden sm:inline">
            Dashboard
          </Link>
        )}

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
  ) : null;
};

export default Navbar;




 