import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import LatestEnrollmentsSkeleton from '../SkeletonLoadingUi/LatestEnrollmentsSkeleton '

const Dashboard = () => {
  const { isEducator, currency, API_URL } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [expandedIds, setExpandedIds] = useState({});

  const fetchDashboardData = async () => {
    try {
      const API = `${API_URL}/api/educator/dashboard`;
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Token not found. Please login again.");
        return;
      }

      const response = await axios.get(API, {
        headers: { 'Authorization': token }
      });

      const data = response.data;
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData();
    }
  }, [isEducator]);

  // return dashboardData ? (
  //   <div className='min-h-screen flex flex-col bg-gray-800 text-gray-200 gap-8 md:p-8 p-4'>
  //     {/* Summary Cards */}
  //     <div className='flex flex-wrap gap-4 justify-center'>
  //       <div className='flex items-center gap-3 shadow-card border border-green-500 p-4 w-full sm:w-56 rounded-md'>
  //         <img src={assets.patients_icon} alt="enrollments" className="w-8 h-8" />
  //         <div>
  //           <p className='text-xl font-semibold'>{dashboardData.enrolledStudentsData.length}</p>
  //           <p className='text-sm'>Total Enrolments</p>
  //         </div>
  //       </div>
  //       <div className='flex items-center gap-3 shadow-card border border-green-500 p-4 w-full sm:w-56 rounded-md'>
  //         <img src={assets.appointments_icon} alt="courses" className="w-8 h-8" />
  //         <div>
  //           <p className='text-xl font-semibold'>{dashboardData.totalCourses}</p>
  //           <p className='text-sm'>Total Courses</p>
  //         </div>
  //       </div>
  //       <div className='flex items-center gap-3 shadow-card border border-green-500 p-4 w-full sm:w-56 rounded-md'>
  //         <img src={assets.earning_icon} alt="earnings" className="w-8 h-8" />
  //         <div>
  //           <p className='text-xl font-semibold text-green-500'>{currency}{Math.floor(dashboardData.totalEarnings)}</p>
  //           <p className='text-sm'>Total Earnings</p>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Latest Enrollments */}
  //     <div className="w-full">
  //       <h2 className="pb-4 text-lg font-medium text-center sm:text-left">Latest Enrolments</h2>
        
  //       {/* Responsive scrollable table */}
  //       <div className="overflow-x-auto border border-green-500 rounded-md">
  //         <table className="min-w-full text-sm text-gray-200">
  //           <thead className="bg-gray-700 text-gray-300">
  //             <tr>
  //               <th className="px-3 py-2 text-center hidden sm:table-cell">#</th>
  //               <th className="px-3 py-2 text-left">Student Name</th>
  //               <th className="px-3 py-2 text-left">Course Title</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {dashboardData.enrolledStudentsData.map((item, index) => (
  //               <tr key={index} className="border-t border-gray-600 hover:bg-gray-700 transition">
  //                 <td className="px-3 py-2 text-center hidden sm:table-cell">{index + 1}</td>
  //                 <td className="px-3 py-2 flex items-center gap-2 flex-wrap sm:flex-nowrap">
  //                   <img
  //                     src={item.student.imageUrl}
  //                     alt="Profile"
  //                     className="w-9 h-9 rounded-full"
  //                   />
  //                   <div className="flex flex-col">
  //                     <span className="font-medium">{item.student.name}</span>
  //                     <span className="text-xs text-gray-400 flex items-center gap-1">
  //                       <strong>studentId:</strong>
  //                       <button
  //                         onClick={() =>
  //                           setExpandedIds((prev) => ({
  //                             ...prev,
  //                             [index]: !prev[index],
  //                           }))
  //                         }
  //                         className="text-blue-400 hover:underline focus:outline-none"
  //                         title="Click to toggle full ID"
  //                       >
  //                         {expandedIds[index]
  //                           ? item.student.email || item.student._id
  //                           : `${(item.student.email || item.student._id)?.substring(0, 5)}...`}
  //                       </button>
  //                     </span>
  //                   </div>
  //                 </td>
  //                 <td className="px-3 py-2">{item.courseTitle}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // ) : (
  //   <LatestEnrollmentsSkeleton />
  // );

return dashboardData ? (
  <div className='min-h-screen bg-gray-800 text-gray-200'>
    <div className='container mx-auto flex flex-col gap-10 p-4 md:p-8'>

      {/* Summary Cards */}
      <div className='flex flex-wrap gap-6 justify-center'>
        <div className='flex-grow max-w-sm flex items-center gap-4 shadow-card border border-green-500 p-6 rounded-xl bg-gray-900'>
          <img src={assets.patients_icon} alt="enrollments" className="w-10 h-10" />
          <div>
            <p className='text-2xl font-bold'>{dashboardData.enrolledStudentsData.length}</p>
            <p className='text-base'>Total Enrolments</p>
          </div>
        </div>
        <div className='flex-grow max-w-sm flex items-center gap-4 shadow-card border border-green-500 p-6 rounded-xl bg-gray-900'>
          <img src={assets.appointments_icon} alt="courses" className="w-10 h-10" />
          <div>
            <p className='text-2xl font-bold'>{dashboardData.totalCourses}</p>
            <p className='text-base'>Total Courses</p>
          </div>
        </div>
        <div className='flex-grow max-w-sm flex items-center gap-4 shadow-card border border-green-500 p-6 rounded-xl bg-gray-900'>
          <img src={assets.earning_icon} alt="earnings" className="w-10 h-10" />
          <div>
            <p className='text-2xl font-bold text-green-500'>{currency}{Math.floor(dashboardData.totalEarnings)}</p>
            <p className='text-base'>Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Latest Enrollments */}
      <div className="w-full">
        <h2 className="pb-4 text-xl font-semibold text-center sm:text-left">Latest Enrolments</h2>

        <div className="overflow-x-auto border border-green-500 rounded-xl bg-gray-900">
          <table className="min-w-full text-base text-gray-200">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-3 text-center hidden sm:table-cell">#</th>
                <th className="px-4 py-3 text-left">Student Name</th>
                <th className="px-4 py-3 text-left">Course Title</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} className="border-t border-gray-600 hover:bg-gray-700 transition">
                  <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    <img
                      src={item.student.imageUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.student.name}</span>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <strong>studentId:</strong>
                        <button
                          onClick={() =>
                            setExpandedIds((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }))
                          }
                          className="text-blue-400 hover:underline focus:outline-none"
                          title="Click to toggle full ID"
                        >
                          {expandedIds[index]
                            ? item.student.email || item.student._id
                            : `${(item.student.email || item.student._id)?.substring(0, 5)}...`}
                        </button>
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
) : (
  <LatestEnrollmentsSkeleton />
);

};

export default Dashboard;
