 

import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CertificatePreview from '../student/CertificatePreview';
import QRCode from 'qrcode';

const VerifyCertificate = () => {
  const { API_URL } = useContext(AppContext);
  const [certificateId, setCertificateId] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDummyCert, setShowDummyCert] = useState(false);

  const certificateRef = useRef(null);
  const canvasRef = useRef(null);

  const handleVerify = async () => {
    if (!certificateId.trim()) {
      toast.warn('Please enter a certificate ID.');
      return;
    }

    setLoading(true);
    setCertificateData(null);
    setShowDummyCert(false);

    try {
      const res = await fetch(`${API_URL}/api/certificate/${certificateId.trim()}`);
      if (!res.ok) throw new Error('Certificate not found');

      const data = await res.json();
      setCertificateData(data);
      await QRCode.toCanvas(canvasRef.current, data.certificateId, { width: 90 });
      toast.success('Certificate verified successfully!');
    } catch (error) {
      console.error(error);
      setShowDummyCert(true);

      // Generate QR for dummy certificate
      const dummyId = 'DUMMY-000000';
      await QRCode.toCanvas(canvasRef.current, dummyId, { width: 90 });
      toast.error('Certificate not found or verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 pb-10">
      <h1 className="text-2xl font-bold mb-6">Verify Certificate</h1>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          className="border border-gray-300 p-2 rounded w-72"
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>

      {/* Verified Certificate Preview */}
      {certificateData && (
        <CertificatePreview
          formData={{
            studentName: certificateData.studentName,
            completionDate: certificateData.completionDate,
            instructorName: certificateData.instructorName,
          }}
          certificateId={certificateData.certificateId}
          courseName={certificateData.courseTitle}
          certificateRef={certificateRef}
          canvasRef={canvasRef}
          onGenerate={() => {}}
          onDownload={() => {}}
          onPrint={() => window.print()}
          handleChange={() => {}}
          certificateReady={true}
        />
      )}

      {/* Dummy Certificate if Not Found */}
      {showDummyCert && (
        <CertificatePreview
          formData={{
            studentName: 'Unknown Student',
            completionDate: new Date().toISOString().split('T')[0],
            instructorName: 'Unknown Instructor',
          }}
          certificateId={'DUMMY-000000'}
          courseName={'Unknown Course'}
          certificateRef={certificateRef}
          canvasRef={canvasRef}
          onGenerate={() => {}}
          onDownload={() => {}}
          onPrint={() => window.print()}
          handleChange={() => {}}
          certificateReady={true}
        />
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default VerifyCertificate;
