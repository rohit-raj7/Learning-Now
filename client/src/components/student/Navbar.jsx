 

 import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { updateProfileImageAPI } from '../../api/Api';
import EducatorNavbar from '../educator/Navbar';

const Navbar = () => {
  const {
    educator,
    educatorData,
    user,
    userData,
    logout ,
    setUserData,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(userData?.mobile || '');
  const fileInputRef = useRef(null);

  const isEducator = Boolean(educatorData || educator);
  const isUser = Boolean(userData || user);

  const profileName =
    userData?.fullName ||
    userData?.name ||
    userData?.email ||
    educatorData?.fullName ||
    educatorData?.email ||
    'User';

  const profileImage =
    userData?.imageUrl ||
    educatorData?.imageUrl ||
    assets.default_user;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await updateProfileImageAPI(file);
      setUserData((prev) => ({ ...prev, imageUrl: res.imageUrl }));
      const updatedUser = JSON.parse(localStorage.getItem('user')) || {};
      updatedUser.imageUrl = res.imageUrl;
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleMobileUpdate = () => {
    console.log('Updated mobile:', mobileNumber);
    // TODO: Add API call to update mobile number
  };

  const toggleDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  if (isEducator) {
    return <EducatorNavbar educator={educatorData || educator || isEducator} logout={logout} />;
  }

  return (
    <div className="bg-[#112d46] border-b border-gray-500 px-4 py-3 flex justify-between items-center">
      <img
        src={assets.logo}
        onClick={() => navigate('/')}
        className="w-16 cursor-pointer"
        alt="Logo"
      />

      {isUser ? (
        <div className="flex items-center gap-5 text-gray-500 relative">
          <p className="text-white">Hi! {profileName}</p>

          <img
            src={profileImage}
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
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/user/signup')}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Let’s Start Learning
          </button>
          <button
            onClick={() => navigate('/educator/signup')}
            className="bg-green-600 text-white px-5 py-2 rounded-full"
          >
            Become Educator
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

