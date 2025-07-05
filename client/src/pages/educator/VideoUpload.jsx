 

// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// import { AppContext } from '../../context/AppContext'; 

// const VideoUpload = ({ setLectureDetails, setUploadProgress, setUploadTimeLeft }) => {
//   const { API_URL } = useContext(AppContext);
//   const [isUploading, setIsUploading] = useState(false);

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setIsUploading(true); // Start showing "Uploading..."

//       const start = Date.now();

//       const config = {
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//           const elapsed = (Date.now() - start) / 1000;
//           const speed = progressEvent.loaded / elapsed;
//           const timeLeft = Math.round((progressEvent.total - progressEvent.loaded) / speed);
//           setUploadProgress(percent);
//           setUploadTimeLeft(timeLeft);
//         },
//       };

//       const { data } = await axios.post(`${API_URL}/api/educator/upload-video`, formData, config);

//       if (data.secure_url) {
//         setLectureDetails((prev) => ({ ...prev, lectureUrl: data.secure_url }));
//         toast.success('Video uploaded successfully');
//       } else {
//         toast.error('Upload failed');
//       }

//     } catch (err) {
//       console.error(err);
//       toast.error('Upload error');
//     } finally {
//       setIsUploading(false); // Hide "Uploading..."
//     }
//   };

//   return (
//     <div className="mb-3">
//       <input
//         type="file"
//         accept="video/*"
//         onChange={handleUpload}
//         className="block w-full border rounded py-1 px-2 mb-2"
//       />
//       {isUploading && (
//         <div className="text-blue-600 font-semibold">Uploading...</div>
//       )}
//     </div>
//   );
// };

// export default VideoUpload;

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const VideoUpload = ({ setLectureDetails, setUploadProgress, setUploadTimeLeft }) => {
  const { API_URL } = useContext(AppContext);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // ✅ Matches backend multer.single('file')

    try {
      setIsUploading(true);

      const start = Date.now();

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          const elapsed = (Date.now() - start) / 1000;
          const speed = progressEvent.loaded / elapsed;
          const timeLeft = Math.round((progressEvent.total - progressEvent.loaded) / speed);
          setUploadProgress(percent);
          setUploadTimeLeft(timeLeft);
        },
        withCredentials: true
      };

      const { data } = await axios.post(`${API_URL}/api/educator/upload-video`, formData, config);

      if (data.secure_url) {
        setLectureDetails((prev) => ({ ...prev, lectureUrl: data.secure_url }));
        toast.success('Video uploaded successfully');
      } else {
        toast.error('Upload failed');
      }

    } catch (err) {
      console.error(err);
      toast.error('Upload error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-3">
      <input
        type="file"
        accept="video/*"
        onChange={handleUpload}
        className="block w-full border rounded py-1 px-2 mb-2"
      />
      {isUploading && (
        <div className="text-blue-600 font-semibold">Uploading...</div>
      )}
    </div>
  );
};

export default VideoUpload;
