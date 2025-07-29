 
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CertificatePreview from './CertificatePreview';
import QRCode from 'qrcode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QrVerifyCertificate = () => {
  const { certificateId } = useParams();
  const { API_URL, domainURL } = useContext(AppContext);
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const certificateRef = useRef(null);

  // 1. Fetch certificate data
  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const res = await fetch(`${API_URL}/api/certificate/${certificateId}`);
        if (!res.ok) throw new Error('Certificate not found');

        const data = await res.json();
        const formatted = {
          studentName: data.studentName || 'Unknown',
          courseTitle: data.courseTitle || 'Unknown Course',
          instructorName: data.instructorName || 'Unknown Instructor',
          completionDate: data.completionDate || new Date().toISOString().split('T')[0],
          certificateId: data.certificateId,
        };

        setCertificateData(formatted);
      } catch (err) {
        toast.error('❌ Certificate not found or invalid QR code.');
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [API_URL, certificateId]);

  // 2. Generate QR after certificateData & canvas are ready
  useEffect(() => {
    if (certificateData && canvasRef.current) {
      const qrURL = `${domainURL}/qr/${certificateId}`;
      QRCode.toCanvas(canvasRef.current, qrURL, { width: 90 }, (err) => {
        if (err) console.error('QR generation error:', err);
      });
    }
  }, [certificateData, canvasRef.current]);

  if (loading) {
    return <p className="text-center mt-10 text-xl">🔍 Verifying certificate...</p>;
  }

  if (!certificateData) {
    return <p className="text-center text-red-600 mt-10">❌ Certificate could not be verified.</p>;
  }

  return (
    <>
      <div className="w-full flex justify-center mt-8 bg-white">
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
          onDownload={() => {}}
          onPrint={() => window.print()}
          handleChange={() => {}}
          certificateReady={true}
        />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default QrVerifyCertificate;
