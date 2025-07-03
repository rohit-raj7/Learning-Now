// import React,{useContext} from 'react';
// import { Outlet } from 'react-router-dom';
// import Footer from '../../components/educator/Footer';
// import { useParams } from 'react-router-dom';
// import { AppContext } from '../../context/AppContext';

// const Student = () => {
//   const { userId } = useParams();
//   const { user } = useContext(AppContext);
//   const student = {
//     id: "14b22dbf-866e-4d0a-8ed2-3cacfa780b00",
//     name: "Rohit Raj",
//     email: "rohitraj70615@gmail.com",
//     imageUrl: "https://cdn-icons-png.freepik.com/256/1154/1154987.png",
//     mobileNumber: "",
//     isVerified: true,
//     enrolledCourses: [
//       "685006113b87706174f22079",
//       "685158db232e20043d469731",
//       "685159be08c9f50d956a838c",
//     ],
//     createdAt: "2025-06-14T04:29:41.393Z",
//   };

//   return (
//     <div className="bg-gray-800 text-white min-h-screen px-6 py-10">
//       {/* Student Information */}
//       <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-md p-6 mb-10">
//         <h2 className="text-2xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Student Information</h2>

//         <div className="flex flex-col sm:flex-row gap-6">
//           {/* Image */}
//           <div className="w-full sm:w-1/4">
//             <img
//               src={student.imageUrl}
//               alt="profile"
//               className="rounded-xl shadow w-full h-auto object-cover border border-gray-700"
//             />
//           </div>

//           {/* Info */}
//           <div className="w-full sm:w-3/4 grid sm:grid-cols-2 gap-4">
//             {[
//               { label: "Name", value: student.name },
//               { label: "Email", value: student.email },
//               { label: "User ID", value: student.id },
//               { label: "Mobile Number", value: student.mobileNumber || 'Not Provided' },
//               { label: "Verified", value: student.isVerified ? 'Yes ✅' : 'No ❌' },
//               { label: "Account Created", value: new Date(student.createdAt).toLocaleDateString() },
//             ].map((item, idx) => (
//               <div key={idx} className="bg-gray-700 p-4 rounded shadow-inner">
//                 <p className="text-sm text-gray-300">{item.label}</p>
//                 <p className="font-medium text-white break-words">{item.value}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enrolled Courses */}
//       <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-md p-6 mb-10">
//         <h2 className="text-xl font-semibold text-green-400 mb-4">Enrolled Course IDs</h2>
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {student.enrolledCourses?.length > 0 ? (
//             student.enrolledCourses.map((id, index) => (
//               <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600 shadow text-center">
//                 <p className="text-sm text-gray-300">Course ID</p>
//                 <p className="font-medium break-words text-white">{id}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400">No Enrolled Courses</p>
//           )}
//         </div>
//       </div>

//       {/* Certificates */}
//       <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-md p-6 mb-10">
//         <h2 className="text-xl font-bold text-purple-400 mb-6">Issued Certificates</h2>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[1, 2, 3].map((_, i) => (
//             <div
//               key={i}
//               className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow hover:shadow-lg transition"
//             >
//               <h3 className="text-lg font-semibold text-white mb-2">Certificate #{i + 1}</h3>
//               <p className="text-sm text-gray-300 mb-3">
//                 Issued for course: <span className="font-medium text-white">Full Stack Development</span>
//               </p>
//               <p className="text-sm text-gray-400 mb-4">
//                 Issued on: {new Date().toLocaleDateString()}
//               </p>
//               <div className="flex gap-2">
//                 <a
//                   href="#"
//                   target="_blank"
//                   className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
//                 >
//                   View
//                 </a>
//                 <a
//                   href="#"
//                   download
//                   className="px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
//                 >
//                   Download
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto">
//         <Outlet />
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Student;








import React, { useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Footer from '../../components/educator/Footer';
import { AppContext } from '../../context/AppContext';

const Student = () => {
  const { userId } = useParams();
  const { userData } = useContext(AppContext);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen px-6 py-10">
      {/* Student Information */}
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Student Information</h2>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Image */}
          <div className="w-full sm:w-1/4">
            <img
              src={userData.imageUrl}
              alt="profile"
              className="rounded-xl shadow w-full h-auto object-cover border border-gray-700"
            />
          </div>

          {/* Info */}
          <div className="w-full sm:w-3/4 grid sm:grid-cols-2 gap-4">
            {[
              { label: "Name", value: userData.name },
              { label: "Email", value: userData.email },
              { label: "User ID", value: userData._id },
              { label: "Mobile Number", value: userData.mobileNumber || 'Not Provided' },
              { label: "Verified", value: userData.isVerified ? 'Yes ✅' : 'No ❌' },
              { label: "Account Created", value: new Date(userData.createdAt).toLocaleDateString() },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-700 p-4 rounded shadow-inner">
                <p className="text-sm text-gray-300">{item.label}</p>
                <p className="font-medium text-white break-words">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold text-green-400 mb-4">Enrolled Course IDs</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userData.enrolledCourses?.length > 0 ? (
            userData.enrolledCourses.map((id, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600 shadow text-center">
                <p className="text-sm text-gray-300">Course ID</p>
                <p className="font-medium break-words text-white">{id}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No Enrolled Courses</p>
          )}
        </div>
      </div>

      {/* Certificates */}
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-bold text-purple-400 mb-6">Issued Certificates</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Certificate #{i + 1}</h3>
              <p className="text-sm text-gray-300 mb-3">
                Issued for course: <span className="font-medium text-white">Full Stack Development</span>
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Issued on: {new Date().toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <a
                  href="#"
                  target="_blank"
                  className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  View
                </a>
                <a
                  href="#"
                  download
                  className="px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Student;
