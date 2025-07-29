 
// import React, { useState, useContext, useRef, useEffect } from 'react';
// import { AppContext } from '../../context/AppContext';
// import CertificatePreview from '../student/CertificatePreview';
// import { generateQRCode } from './qr.js';

// const VerifyCertificate = () => {
//   const { API_URL, domainURL } = useContext(AppContext);
//   const [certificateId, setCertificateId] = useState('');
//   const [certificateData, setCertificateData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');

//   const certificateRef = useRef(null);
//   const canvasRef = useRef(null);

//   const handleVerify = async () => {
//     const certId = certificateId.trim();
//     if (!certId) {
//       setMessageType('warning');
//       setMessage('⚠️ Please enter a certificate ID.');
//       return;
//     }

//     setLoading(true);
//     setCertificateData(null);
//     setMessage('');

//     try {
//       const res = await fetch(`${API_URL}/api/certificate/${certId}`);

//       if (!res.ok || res.status === 404) {
//         setMessageType('error');
//         setMessage('❌ Certificate not found');
//         throw new Error('Certificate not found');
//       }

//       const data = await res.json();

//       const completeData = {
//         certificateId: data.certificateId || 'MISSING-ID',
//         studentName: data.studentName || 'Unknown Student',
//         completionDate: data.completionDate || new Date().toISOString().split('T')[0],
//         instructorName: data.instructorName || 'Unknown Instructor',
//         courseTitle: data.courseTitle || 'Unknown Course',
//       };

//       setCertificateData(completeData);
//       setMessageType('success');
//       setMessage('✅ Certificate verified successfully!');
//     } catch (error) {
//       setMessageType('error');
//       setMessage('❌ Certificate not found or verification failed.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (certificateData?.certificateId) {
//       generateQRCode(canvasRef, domainURL, certificateData.certificateId);
//     }
//   }, [certificateData, domainURL]);

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-50 px-4 pt-10 pb-20">
//       <h1 className="text-3xl font-bold mb-6 text-center">Verify Certificate</h1>
//       <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-4">
//         <input
//           type="text"
//           placeholder="Enter Certificate ID"
//           value={certificateId}
//           onChange={(e) => setCertificateId(e.target.value)}
//           className="border border-gray-300 p-2 rounded w-80"
//         />
//         <button
//           onClick={handleVerify}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           {loading ? 'Verifying...' : 'Verify'}
//         </button>
//       </div>

//       {message && (
//         <div className={`text-xl mt-2 px-6 py-3 rounded ${
//           messageType === 'error' ? 'bg-red-100 text-red-700'
//           : messageType === 'success' ? 'bg-green-100 text-green-800'
//           : 'bg-yellow-100 text-yellow-700'
//         }`}>
//           {message}
//         </div>
//       )}

//       {certificateData && (
//         <div className="mt-8 w-full flex justify-center">
//           <CertificatePreview
//             formData={{
//               studentName: certificateData.studentName,
//               completionDate: certificateData.completionDate,
//               instructorName: certificateData.instructorName,
//             }}
//             courseName={certificateData.courseTitle}
//             certificateId={certificateData.certificateId}
//             certificateRef={certificateRef}
//             canvasRef={canvasRef}
//             onGenerate={() => { }}
//             onDownload={() => { }}
//             onPrint={() => window.print()}
//             handleChange={() => { }}
//             certificateReady={true}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerifyCertificate;






import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import CertificatePreview from '../student/CertificatePreview';
import { generateQRCode } from './qr.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const VerifyCertificate = () => {
  const { API_URL, domainURL } = useContext(AppContext);
  const [certificateId, setCertificateId] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const certificateRef = useRef(null);
  const canvasRef = useRef(null);

  const handleVerify = async () => {
    const certId = certificateId.trim();
    if (!certId) {
      setMessageType('warning');
      setMessage('⚠️ Please enter a certificate ID.');
      return;
    }

    setLoading(true);
    setCertificateData(null);
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/api/certificate/${certId}`);
      if (!res.ok || res.status === 404) {
        setMessageType('error');
        setMessage('❌ Certificate not found');
        throw new Error('Certificate not found');
      }

      const data = await res.json();
      const completeData = {
        certificateId: data.certificateId || 'MISSING-ID',
        studentName: data.studentName || 'Unknown Student',
        completionDate: data.completionDate || new Date().toISOString().split('T')[0],
        instructorName: data.instructorName || 'Unknown Instructor',
        courseTitle: data.courseTitle || 'Unknown Course',
      };

      setCertificateData(completeData);
      setMessageType('success');
      setMessage('✅ Certificate verified successfully!');
    } catch (error) {
      setMessageType('error');
      setMessage('❌ Certificate not found or verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`Certificate-${certificateId}.pdf`);
  };

  useEffect(() => {
    if (certificateData?.certificateId) {
      generateQRCode(canvasRef, domainURL, certificateData.certificateId);
    }
  }, [certificateData, domainURL]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-50 px-4 pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Verify Certificate</h1>
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          className="border border-gray-300 p-2 rounded w-80"
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>

      {message && (
        <div className={`text-xl mt-2 px-6 py-3 rounded ${
          messageType === 'error' ? 'bg-red-100 text-red-700'
          : messageType === 'success' ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-700'
        }`}>
          {message}
        </div>
      )}

      {certificateData && (
        <div className="mt-8 w-full flex justify-center">
          <CertificatePreview
            formData={{
              studentName: certificateData.studentName,
              completionDate: certificateData.completionDate,
              instructorName: certificateData.instructorName,
            }}
            courseName={certificateData.courseTitle}
            certificateId={certificateData.certificateId}
            certificateRef={certificateRef}
            canvasRef={canvasRef}
            onGenerate={() => {}}
            onDownload={handleDownloadPDF}  // <-- FIXED!
            onPrint={() => window.print()}
            handleChange={() => {}}
            certificateReady={true}
          />
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
