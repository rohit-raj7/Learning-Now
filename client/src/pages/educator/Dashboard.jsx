import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';



const Dashboard = () => {

  const { isEducator, currency ,API_URL} = useContext(AppContext)

  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    try {
      API = `${API_URL}/api/educator/dashboard`;

      const token = localStorage.getItem('token'); // ✅ define it first
      if (!token) {
        toast.error("Token not found. Please login again.");
        return;
      }

      const headers = {
        headers: {
          'Authorization': token
        }
      };

      const response = await axios.get(API, headers);  
      const data = response.data;

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }



  useEffect(() => {

    if (isEducator) {
      fetchDashboardData()
    }

  }, [isEducator])

  return dashboardData ? (
    <div className='min-h-screen flex flex-col bg-gray-800 text-gray-200 items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5'>
        <div className='flex flex-wrap gap-5 items-center'>
          <div className='flex items-center gap-3 shadow-card border border-green-500 p-4 w-56 rounded-md'>
            <img src={assets.patients_icon} alt="patients_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-300'>{dashboardData.enrolledStudentsData.length}</p>
              <p className='text-base text-gray-200'>Total Enrolments</p>
            </div>
          </div>
          <div className='flex items-center gap-3 shadow-card border border-green-500 p-4 w-56 rounded-md'>
            <img src={assets.appointments_icon} alt="patients_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-300'>{dashboardData.totalCourses}</p>
              <p className='text-base text-gray-200'>Total Courses</p>
            </div>
          </div>
          <div className='flex items-center gap-3 shadow-card border border-green-500 p-4 w-56 rounded-md'>
            <img src={assets.earning_icon} alt="patients_icon" />
            <div>
              <p className='text-2xl font-medium text-green-500'>{currency}{Math.floor(dashboardData.totalEarnings)}</p>
              <p className='text-base text-gray-200'>Total Earnings</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="pb-4 text-lg font-medium">Latest Enrolments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md border text-gray-200 border-green-500">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell text-gray-200">#</th>
                  <th className="px-4 py-3 font-semibold text-gray-200">Student Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-200">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-200">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-500/20">
                    <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="truncate">{item.student.name}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <h3 className="text-sm text-gray-200">studentId:</h3>
                        <span>{item.student.email || item.student._id}</span>
                      </div>

                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </div>
  ) : <Loading />
}

export default Dashboard

 