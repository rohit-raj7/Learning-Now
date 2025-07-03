import React, { useContext } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const SideBar = () => {
  const { educatorId } = useParams();
  const { isEducator, educatorData } = useContext(AppContext);
  const location = useLocation();

  const basePath = `/educator/${educatorData?._id || educatorId}`;

  const menuItems = [
    { name: 'Dashboard', path: `${basePath}` , icon: assets.home_icon },
    { name: 'Add Course', path: `${basePath}/add-course`, icon: assets.add_icon },
    { name: 'My Courses', path: `${basePath}/my-courses`, icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: `${basePath}/student-enrolled`, icon: assets.person_tick_icon },
  ];

  return isEducator && (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col'>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            to={item.path}
            key={item.name}
            className={`flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive
              ? 'bg-indigo-500 border-r-[6px] border-indigo-500'
              : 'hover:bg-indigo-500 border-r-[6px] border-gray-800 hover:border-indigo-500'
            }`}
          >
            <img src={item.icon} alt="" className="w-6 h-6" />
            <p className='md:block hidden text-center text-gray-200'>{item.name}</p>
          </NavLink>
        );
      })}
    </div>
  );
};

export default SideBar;
