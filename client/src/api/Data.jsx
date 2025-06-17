import API from './Api.jsx';

const fetchProtectedData = async () => {
  try {
    const response = await API.get('/api/user/data');
    console.log('Protected data:', response.data);
  } catch (err) {
    console.error('Failed to fetch protected data:', err);
  }
};
