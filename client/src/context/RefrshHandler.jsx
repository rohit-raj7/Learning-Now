// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function RefrshHandler({ setIsAuthenticated }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (token) {
//       setIsAuthenticated(true);

//       const isPublicRoute =
//         location.pathname === '/' ||
//         location.pathname === '/user/login' ||
        
//         location.pathname === '/user' ||
//         location.pathname === '/user/signup' ||
//         location.pathname === '/educator/login' ||
//         location.pathname === '/educator/signup';

//       if (isPublicRoute) {
//         navigate('/', { replace: true });
//       }
//     }
//   }, [location, navigate, setIsAuthenticated]);

//   return null;
// }

// export default RefrshHandler;
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // 'user' or 'educator'

    if (token) {
      setIsAuthenticated(true);

      const isAuthPage =
        location.pathname === '/' ||
        location.pathname === '/user/login' ||
        location.pathname === '/user/signup' ||
        location.pathname === '/user/forgot-password' ||
        location.pathname === '/educator/login' ||
        location.pathname === '/educator/signup' ||
        location.pathname === '/educator/forgot-password';

      if (isAuthPage) {
        // Redirect based on role
        if (role === 'educator') {
          navigate('/educator', { replace: true });
        } else {
          navigate('/user', { replace: true });
        }
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefrshHandler;
