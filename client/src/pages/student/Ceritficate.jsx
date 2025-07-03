 
import { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AppContext } from '../../context/AppContext';
import CertificatePreview from './CertificatePreview';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CertificateGenerator = () => {
    const { courseId } = useParams();
    const {
        user,
        userData,
        educator,
        educatorData,
        enrolledCourses,
        API_URL,
        fetchUserEnrolledCourses
    } = useContext(AppContext);

    const canvasRef = useRef(null);
    const certificateRef = useRef(null);
    const [certificateReady, setCertificateReady] = useState(false);

    const courseObj = enrolledCourses?.find(course => course._id === courseId);
    const courseName = courseObj?.courseTitle || 'Course Name';
    const studentId = user?.id || userData?._id || '';
    const certificateId = `${courseObj?._id || ''}-${studentId}`;

    const [formData, setFormData] = useState({
        studentName: '',
        courseId: '',
        completionDate: '',
        instructorName: '',
        certificateId
    });

    useEffect(() => {
        fetchUserEnrolledCourses();
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

        let localUser = {};
        let localEducator = {};

        try {
            const userStr = localStorage.getItem('user');
            if (userStr && userStr !== 'undefined') {
                localUser = JSON.parse(userStr);
            }
        } catch (err) {
            console.warn('Invalid user data in localStorage');
        }

        try {
            const educatorStr = localStorage.getItem('educator');
            if (educatorStr && educatorStr !== 'undefined') {
                localEducator = JSON.parse(educatorStr);
            }
        } catch (err) {
            console.warn('Invalid educator data in localStorage');
        }

        const latestCourseId = enrolledCourses?.[0]?._id || '';

        setFormData(prev => ({
            ...prev,
            studentName: userData?.name || localUser?.name || '',
            instructorName: educatorData?.name || localEducator?.name || '',
            completionDate: today,
            courseId: latestCourseId || '',
            certificateId
        }));
    }, [userData, educatorData, enrolledCourses]);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const generateCertificate = async () => {
        const certId = certificateId.trim();

        const payload = {
            certificateId: certId,
            studentName: formData.studentName,
            courseId: courseObj?._id,
            courseTitle: courseName,
            instructorName: formData.instructorName,
            completionDate: formData.completionDate
        };

        try {
            const response = await fetch(`${API_URL}/api/certificate/${certId}`);
            if (response.ok) {
                const data = await response.json();
                setFormData(prev => ({ ...prev, ...data }));
            } else {
                const createRes = await fetch(`${API_URL}/api/certificate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const createdCert = await createRes.json();
                setFormData(prev => ({ ...prev, ...createdCert }));
            }

            // ✅ Step 1: Show the certificate first
            setCertificateReady(true);

            // ✅ Step 2: Wait for the certificate UI (especially canvas) to render
            setTimeout(() => {
                if (canvasRef.current && certId) {
                    QRCode.toCanvas(canvasRef.current, certId, { width: 90 })
                        .then(() => {
                            toast.success("Certificate generated successfully!");
                        })
                        .catch(err => {
                            console.error("QR generation failed:", err);
                            toast.error("Failed to generate QR code.");
                        });
                }
            }, 100); // Give time for canvas to mount

        } catch (err) {
            console.error('Certificate generation failed:', err);
            toast.error('Failed to generate or fetch certificate. Try again.');
        }
    };


    const downloadCertificate = async () => {
        const element = certificateRef.current;
        if (!certificateReady || !element) {
            toast.warning('Please generate the certificate before downloading.');
            return;
        }

        try {
            element.scrollIntoView({ behavior: 'auto', block: 'center' });
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                backgroundColor: '#ffffff',
                scrollY: -window.scrollY
            });

            const imageData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${formData.studentName || 'certificate'}.pdf`);
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download certificate. Please try again.');
        }
    };

    const printCertificate = () => {
        if (!certificateReady) {
            toast.warning('Please generate the certificate before printing.');
            return;
        }
        window.print();
    };

    return (
        <>
            <CertificatePreview
                formData={formData}
                certificateId={certificateId}
                courseName={courseName}
                certificateRef={certificateRef}
                canvasRef={canvasRef}
                onGenerate={generateCertificate}
                onDownload={downloadCertificate}
                onPrint={printCertificate}
                handleChange={handleChange}
                certificateReady={certificateReady}
            />
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
};

export default CertificateGenerator;
