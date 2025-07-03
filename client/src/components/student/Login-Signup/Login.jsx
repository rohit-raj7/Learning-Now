

// import React, { useState ,useContext} from 'react';
// import { Link, useNavigate,useParams } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { assets } from './assets/assets';
// import clientId from './GoogleOAuthProvider';
// import Loading from './Loading';
// import { AppContext } from '../../../context/AppContext.jsx'; 

// function Login() {
//   const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [role, setRole] = useState('student'); // 'student' or 'educator'
//   const navigate = useNavigate();
  
//   const { userId } = useParams();  
  
//   const {API_URL,userData} = useContext(AppContext);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { email, password } = loginInfo;

//     if (!email || !password) {
//       toast.error('Email and password are required');
//       setLoading(false);
//       return;
//     }

//     const url =
//       role === 'student'
//         ? `${API_URL}/api/user/login`
//         : `${API_URL}/api/educator/login`;

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loginInfo),
//       });

//       const result = await response.json();
//       const { success, message, jwtToken, error } = result;

//       if (success) {
//         toast.success(message || 'Login successful!');
//         localStorage.setItem('token', jwtToken);
//         localStorage.setItem(
//           role === 'student' ? 'user' : 'educator',
//           JSON.stringify(result[role])
//         );

//         setTimeout(() => {
//           navigate(role === 'student' ? `/user/${userData._id}/my-enrollments` : '/educator');
//           setTimeout(() => {
//             window.location.reload();
//           }, 100);
//         }, 1000);
//       } else {
//         toast.error(error || message || 'Login failed.');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       toast.error('Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <> 
//       <GoogleOAuthProvider clientId={clientId}>
//         <div
//           className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
//           style={{ backgroundImage: `url(${role === 'student' ? assets.bg_img : assets.bg_educator})` }}
//         >

//           <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
//           <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse z-0"></div>
//           <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse z-0"></div>
//           <div className='flex flex-col'>
//             {/* Toggle */}
//             <div className="flex justify-center mb-6">
//               <div className="relative flex w-64 sm:w-72 bg-white/10 backdrop-blur-lg border border-cyan-500/30 overflow-hidden rounded-full p-1 shadow-inner">
//                 {/* Sliding active background */}
//                 <div
//                   className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-cyan-600 transition-all duration-300 ease-in-out ${role === 'student' ? 'left-1' : 'left-1/2'
//                     }`}
//                 ></div>

//                 {/* Student Button */}
//                 <button
//                   type="button"
//                   onClick={() => setRole('student')}
//                   className={`w-1/2 z-10 py-2 text-sm sm:text-base font-medium transition-all duration-200 rounded-full ${role === 'student' ? 'text-white' : 'text-gray-300 hover:text-white'
//                     }`}
//                 >
//                   Student
//                 </button>

//                 {/* Educator Button */}
//                 <button
//                   type="button"
//                   onClick={() => setRole('educator')}
//                   className={`w-1/2 z-10 py-2 text-sm sm:text-base font-medium transition-all duration-200 rounded-full ${role === 'educator' ? 'text-white' : 'text-gray-300 hover:text-white'
//                     }`}
//                 >
//                   Educator
//                 </button>
//               </div>
//             </div>





//             <div className="z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
//               <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-cyan-300 text-center tracking-wide">
//                 {role === 'student' ? 'Student Login' : 'Educator Login'}
//               </h2>


//               {/* Form */}
//               <form onSubmit={handleSubmit}>
//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="Enter Email"
//                   className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   value={loginInfo.email}
//                   onChange={handleChange}
//                   required
//                   disabled={loading}
//                 />
//                 <input
//                   name="password"
//                   type="password"
//                   placeholder="Enter Password"
//                   className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   value={loginInfo.password}
//                   onChange={handleChange}
//                   required
//                   disabled={loading}
//                 />

//                 <p className="text-sm text-cyan-100 mb-4 text-right">
//                   <Link
//                     to={
//                       role === 'student'
//                         ? '/user/forgot-password'
//                         : '/educator/forgot-password'
//                     }
//                     className="hover:underline text-cyan-300"
//                   >
//                     Forgot Password?
//                   </Link>
//                 </p>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition duration-300 ${loading ? 'cursor-not-allowed opacity-70' : ''
//                     }`}
//                 >
//                   {loading ? <Loading /> : 'Login'}
//                 </button>

//                 <p className="text-sm text-center text-cyan-200 mt-4">
//                   Don't have an account?{' '}
//                   <Link
//                     to={role === 'student' ? '/user/signup' : '/user/signup'}
//                     className="text-cyan-300 hover:underline"
//                   >
//                     Sign Up
//                   </Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//       </GoogleOAuthProvider>
//     </>
//   );
// }

// export default Login;
 







import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from './assets/assets';
import clientId from './GoogleOAuthProvider';
import Loading from './Loading';
import { AppContext } from '../../../context/AppContext.jsx';

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const { API_URL } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = loginInfo;

    if (!email || !password) {
      toast.error('Email and password are required');
      setLoading(false);
      return;
    }

    const url =
      role === 'student'
        ? `${API_URL}/api/user/login`
        : `${API_URL}/api/educator/login`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, error } = result;

      if (success) {
        toast.success(message || 'Login successful!');
        localStorage.setItem('token', jwtToken);
        localStorage.setItem(
          role === 'student' ? 'user' : 'educator',
          JSON.stringify(result[role])
        );

        const id = result[role]?._id;

        setTimeout(() => {
          navigate(role === 'student' ? `/user/${id}/my-enrollments` : `/educator/${id}`);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }, 1000);
      } else {
        toast.error(error || message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
          style={{ backgroundImage: `url(${role === 'student' ? assets.bg_img : assets.bg_educator})` }}
        >
          <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
          <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse z-0"></div>
          <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse z-0"></div>

          <div className='flex flex-col'>

            {/* Toggle */}
            <div className="flex justify-center mb-6">
              <div className="relative flex w-64 sm:w-72 bg-white/10 backdrop-blur-lg border border-cyan-500/30 overflow-hidden rounded-full p-1 shadow-inner">
                {/* Sliding active background */}
                <div
                  className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-cyan-600 transition-all duration-300 ease-in-out ${role === 'student' ? 'left-1' : 'left-1/2'
                    }`}
                ></div>

                {/* Student Button */}
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`w-1/2 z-10 py-2 text-sm sm:text-base font-medium transition-all duration-200 rounded-full ${role === 'student' ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                >
                  Student
                </button>

                {/* Educator Button */}
                <button
                  type="button"
                  onClick={() => setRole('educator')}
                  className={`w-1/2 z-10 py-2 text-sm sm:text-base font-medium transition-all duration-200 rounded-full ${role === 'educator' ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                >
                  Educator
                </button>
              </div>
            </div>

            {/* Login Card */}
            <div className="z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-cyan-300 text-center tracking-wide">
                {role === 'student' ? 'Student Login' : 'Educator Login'}
              </h2>

              <form onSubmit={handleSubmit}>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={loginInfo.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={loginInfo.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <p className="text-sm text-cyan-100 mb-4 text-right">
                  <Link
                    to={
                      role === 'student'
                        ? '/user/forgot-password'
                        : '/educator/forgot-password'
                    }
                    className="hover:underline text-cyan-300"
                  >
                    Forgot Password?
                  </Link>
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition duration-300 ${loading ? 'cursor-not-allowed opacity-70' : ''
                    }`}
                >
                  {loading ? <Loading /> : 'Login'}
                </button>

                <p className="text-sm text-center text-cyan-200 mt-4">
                  Don't have an account?{' '}
                  <Link
                    to={role === 'student' ? '/user/signup' : '/user/signup'}
                    className="text-cyan-300 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </GoogleOAuthProvider>
    </>
  );
}

export default Login;
