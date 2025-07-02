 
import React, { useContext, useRef, useState, useEffect } from 'react';
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
    logout,
    setUserData,
  } = useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();
  const isUserInfoPage = location.pathname === "/user/my-enrollments";
  const hideSignup = ['/user/signup', '/user/login'].includes(location.pathname);

  const dropdownRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    return <EducatorNavbar educator={educatorData || educator} logout={logout} />;
  }

  return (
    <div className="bg-[#112d46] border-b border-gray-500 px-4 py-3 flex justify-between items-center">
      <img
        src={assets.logo}
        onClick={() => navigate('/')}
        className="w-16 sm:w-16 md:w-20 lg:w-24 cursor-pointer object-contain ml-5"
        alt="Logo"
      />
      <Link to='/' className='hidden sm:block'>
        <p className='bg-green-500 text-white text-sm md:text-base rounded rounded-xl hover:text-black md:px-6 px-4 md:py-2 py-1 mx-1'>Home</p>
      </Link>

      {isUser ? (
        <div className="flex items-center gap-6 text-gray-500 relative">
          {isUserInfoPage ? (
            <button className="bg-green-600 text-white text-sm sm:text-base px-4 py-2 rounded-full w-fit sm:w-auto">
              <Link to="/user" className="text-white">User Details</Link>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-white hover:text-green-500">
                <Link to="/user/my-enrollments">My Enrollment</Link>
              </p>
              <span className="text-white">|</span>
            </div>
          )}

          <p className="text-white hidden sm:block">Hi! {profileName}</p>

          <img
            src={profileImage}
            alt="Profile"
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-full border-2 border-cyan-500 cursor-pointer object-cover"
          />

          {showProfileDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-14 right-0 w-64 sm:w-80 z-50 p-5 bg-gray-900 text-gray-100 rounded-xl shadow-xl border border-gray-800"
            >
              <div className="flex flex-col items-center text-center mb-5">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500 shadow-lg"
                />
                <h2 className="mt-3 text-lg font-semibold">{profileName}</h2>
                <p className="text-sm text-gray-400">{userData?.email || 'No email provided'}</p>
                <div className="mt-2 text-xs sm:text-sm text-gray-400 space-y-1">
                  <p><strong>Mobile:</strong> {userData?.mobile || 'N/A'}</p>
                  <p><strong>Total Courses:</strong> {userData?.enrolledCourses?.length || 0}</p>
                  <p><strong>Last Updated:</strong> {userData?.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>

              <hr className="border-gray-700 mb-4" />

              <div className="mb-4">
                <label htmlFor="profile-image" className="block text-sm font-medium mb-1">Change Profile Image</label>
                <input
                  id="profile-image"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="mobile-number" className="block text-sm font-medium mb-1">Mobile Number</label>
                <input
                  id="mobile-number"
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={handleMobileUpdate}
                  className="mt-2 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Update Mobile
                </button>
              </div>

              <button
                onClick={logout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        !hideSignup && (
          <div className="flex flex-col sm:flex-row gap-3 mr-5 sm:gap-5 items-center sm:items-start">
            <button
              onClick={() => navigate('/user/signup')}
              className="bg-blue-600 text-white text-sm sm:text-base px-8 py-2 rounded-full w-fit sm:w-auto"
            >
              Sign Up
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Navbar;
