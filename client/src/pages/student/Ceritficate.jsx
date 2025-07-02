


// import { useEffect, useRef, useState, useContext } from 'react';
// import QRCode from 'qrcode';
// import html2canvas from 'html2canvas';
// import { useParams } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import { AppContext } from '../../context/AppContext';
// import { assets } from '../../assets/assets';

// const CertificateGenerator = () => {
//     const { courseId } = useParams();
//     const {
//         user,
//         userData,
//         educator,
//         educatorData,
//         enrolledCourses,
//         fetchUserEnrolledCourses
//     } = useContext(AppContext);

//     const canvasRef = useRef(null);
//     const certificateRef = useRef(null);
//     const [certificateReady, setCertificateReady] = useState(false);

//     const [formData, setFormData] = useState({
//         studentName: '',
//         courseId: '',
//         completionDate: '',
//         instructorName: '',
//     });

//     const courseName =
//         enrolledCourses?.find((course) => course._id === courseId)?.courseTitle || 'Course Name';

//     const courseObj = enrolledCourses?.find((course) => course._id === courseId);
//     const studentId = user?.id || userData?._id || ''; // fallback if user is undefined
//     const certificateId = `${courseObj?._id || ''}-${studentId}`;



//     useEffect(() => {
//         fetchUserEnrolledCourses();
//     }, []);

//     useEffect(() => {
//         const today = new Date().toISOString().split('T')[0];

//         const localUser = (() => {
//             try {
//                 const data = localStorage.getItem('user');
//                 return data ? JSON.parse(data) : null;
//             } catch (e) {
//                 console.warn('Failed to parse user from localStorage', e);
//                 return null;
//             }
//         })();

//         const localEducator = (() => {
//             try {
//                 const data = localStorage.getItem('educator');
//                 return data ? JSON.parse(data) : null;
//             } catch (e) {
//                 console.warn('Failed to parse educator from localStorage', e);
//                 return null;
//             }
//         })();

//         const latestCourseId = enrolledCourses?.[0]?._id || '';

//         setFormData((prev) => ({
//             ...prev,
//             studentName: userData?.name || localUser?.name || '',
//             instructorName: educatorData?.name || localEducator?.name || '',
//             completionDate: today,
//             courseId: latestCourseId || ''
//         }));
//     }, [userData, educatorData, enrolledCourses]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const generateCertificate = async () => {
//         const {
//             studentName,
//             courseId,
//             completionDate,
//             instructorName,
//             certificateId
//         } = formData;

//         let certId = certificateId?.trim();
//         if (!certId) {
//             certId = 'CERT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
//             setFormData((prev) => ({ ...prev, certificateId: certId }));
//         }

//         if (canvasRef.current) {
//             try {
//                 await QRCode.toCanvas(canvasRef.current, certId, { width: 90 });
//                 setCertificateReady(true);

//                 // Wait 2 seconds before downloading
//                 setTimeout(() => {
//                     downloadCertificate();
//                 }, 2000);
//             } catch (err) {
//                 console.error('QR Code generation failed', err);
//             }
//         }
//     };

//   const downloadCertificate = async () => {
//     const element = certificateRef.current;

//     if (!certificateReady || !element) {
//         alert('Please generate the certificate before downloading.');
//         return;
//     }

//     try {
//         // Scroll to ensure rendering is complete
//         element.scrollIntoView({ behavior: 'auto', block: 'center' });

//         // Give time for DOM to paint (especially QR canvas, fonts, and image)
//         await new Promise(resolve => setTimeout(resolve, 500)); // increased from 300 to 500

//         const canvas = await html2canvas(element, {
//             scale: 3, // high-res output
//             useCORS: true,
//             allowTaint: false, // safer rendering
//             backgroundColor: '#ffffff',
//             scrollY: -window.scrollY, // avoid scroll interference
//         });

//         const imageData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF({
//             orientation: 'landscape',
//             unit: 'px',
//             format: [canvas.width, canvas.height],
//         });

//         pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
//         pdf.save(`${formData.studentName || 'certificate'}.pdf`);
//     } catch (error) {
//         console.error('Download failed:', error);
//         alert('Failed to download certificate. Please try again.');
//     }
// };


//     const printCertificate = () => {
//         if (!certificateReady) {
//             alert('Please generate the certificate before printing.');
//             return;
//         }
//         window.print();
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-[Montserrat]">
//             <div className="max-w-7xl mx-auto">
//                 <div className="text-center mb-12">
//                     <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Course Certificate Generator</h1>
//                     <p className="text-lg text-gray-600">Generate professional certificates for your completed courses</p>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     <div className="no-print bg-white p-6 rounded-lg shadow-md">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Certificate Details</h2>
//                         <div className="space-y-6">
//                             <div>
//                                 <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
//                                 <input
//                                     type="text"
//                                     id="studentName"
//                                     name="studentName"
//                                     value={formData.studentName}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-gray-500"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Course</label>
//                                 <p className="mt-1 p-2 text-gray-700 border border-gray-300 rounded-md bg-gray-100">
//                                     {courseName}
//                                 </p>
//                             </div>

//                             <div>
//                                 <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">Completion Date</label>
//                                 <input
//                                     type="date"
//                                     id="completionDate"
//                                     name="completionDate"
//                                     value={formData.completionDate}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-gray-500"
//                                 />
//                             </div>


//                             <div>
//                                 <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700">Certificate ID</label>
//                                 <input
//                                     type="text"
//                                     id="certificateId"
//                                     name="certificateId"
//                                     value={certificateId}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-gray-500"
//                                 />
//                             </div>

//                             <div className="flex flex-wrap gap-4">
//                                 <button onClick={generateCertificate} className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
//                                     Generate Certificate
//                                 </button>
//                                 <button onClick={printCertificate} className="rounded-md bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700">
//                                     Print Certificate
//                                 </button>
//                                 <button
//                                     onClick={downloadCertificate}
//                                     className="rounded-md bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700"
//                                 >
//                                     Download PDF
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex justify-center items-start">
//                         <div ref={certificateRef} className="w-full max-w-2xl p-8 rounded-lg shadow-lg border-8 border-yellow-400 bg-gradient-to-br from-white to-gray-100">
//                             <div className="text-center mb-8">
//                                 <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d20d6fcb-59d4-4645-a2e2-855dfcf3fb2f.png" alt="Logo" className="mx-auto h-24" />
//                                 <h2 className="text-2xl font-bold text-gray-800 mt-4">Certificate of Completion</h2>
//                             </div>

//                             <div className="text-center mb-8">
//                                 <p className="text-gray-600 mb-6">This is to certify that</p>
//                                 <h1 className="text-4xl font-bold text-indigo-800 mb-8 font-[Playfair Display]">{formData.studentName || 'Student Name'}</h1>
//                                 <p className="text-gray-600 mb-4">has successfully completed the course</p>
//                                 <h2 className="text-2xl font-semibold text-gray-800 mb-8">{courseName}</h2>
//                                 <p className="text-gray-600 mb-4">on</p>
//                                 <p className="text-xl text-gray-700 mb-8">
//                                     {formData.completionDate ? new Date(formData.completionDate).toLocaleDateString('en-US', {
//                                         year: 'numeric',
//                                         month: 'long',
//                                         day: 'numeric'
//                                     }) : 'Month Day, Year'}
//                                 </p>
//                                 <p className="text-gray-600">This certificate is awarded on this day in recognition of dedication and accomplishment.</p>
//                             </div>

//                             <div className="grid grid-cols-3 items-end mt-12 gap-4">
//                                 <div className="text-center">
//                                     <div className="h-1 w-24 mx-auto bg-gray-400 mb-2"></div>
//                                     <p className="text-gray-800 font-semibold">{formData.instructorName || 'Online Learing'}</p>
//                                     <p className="text-gray-600 text-sm">Instructor</p>
//                                 </div>

//                                 <div className="text-center">
//                                     <img src={assets.CEO_Sign} alt="CEO Signature" className="h-10 mx-auto mb-2" />
//                                     <p className="text-gray-800 font-semibold">ROHIT RAJ</p>
//                                     <p className="text-gray-600 text-sm">Chief Executive Officer</p>
//                                 </div>

//                                 <div className="text-center">
//                                     <div className="QR-Code w-24 h-24 mx-auto bg-yellow-300 flex items-center justify-center shadow-md rounded-full overflow-hidden">
//                                         <canvas ref={canvasRef} width="90" height="90"></canvas>
//                                     </div>
//                                     <p className="text-gray-600 text-sm mt-2">ID:{certificateId}</p>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CertificateGenerator;






















import { useEffect, useRef, useState, useContext } from 'react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const CertificateGenerator = () => {
    const { courseId } = useParams();
    const {
        user,
        userData,
        educator,
        educatorData,
        enrolledCourses,
        fetchUserEnrolledCourses
    } = useContext(AppContext);

    const canvasRef = useRef(null);
    const certificateRef = useRef(null);
    const [certificateReady, setCertificateReady] = useState(false);

    const [formData, setFormData] = useState({
        studentName: '',
        courseId: '',
        completionDate: '',
        instructorName: '',
    });

    const courseName =
        enrolledCourses?.find((course) => course._id === courseId)?.courseTitle || 'Course Name';

    const courseObj = enrolledCourses?.find((course) => course._id === courseId);
    const studentId = user?.id || userData?._id || ''; // fallback if user is undefined
    const certificateId = `${courseObj?._id || ''}-${studentId}`;



    useEffect(() => {
        fetchUserEnrolledCourses();
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

        const localUser = (() => {
            try {
                const data = localStorage.getItem('user');
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.warn('Failed to parse user from localStorage', e);
                return null;
            }
        })();

        const localEducator = (() => {
            try {
                const data = localStorage.getItem('educator');
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.warn('Failed to parse educator from localStorage', e);
                return null;
            }
        })();

        const latestCourseId = enrolledCourses?.[0]?._id || '';

        setFormData((prev) => ({
            ...prev,
            studentName: userData?.name || localUser?.name || '',
            instructorName: educatorData?.name || localEducator?.name || '',
            completionDate: today,
            courseId: latestCourseId || ''
        }));
    }, [userData, educatorData, enrolledCourses]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const generateCertificate = async () => {
    //     const {
    //         studentName,
    //         courseId,
    //         completionDate,
    //         instructorName,
    //         certificateId
    //     } = formData;

    //     let certId = certificateId?.trim();
    //     if (!certId) {
    //         certId = 'CERT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    //         setFormData((prev) => ({ ...prev, certificateId: certId }));
    //     }

    //     if (canvasRef.current) {
    //         try {
    //             await QRCode.toCanvas(canvasRef.current, certId, { width: 90 });
    //             setCertificateReady(true);

    //             // Wait 2 seconds before downloading
    //             setTimeout(() => {
    //                 downloadCertificate();
    //             }, 2000);
    //         } catch (err) {
    //             console.error('QR Code generation failed', err);
    //         }
    //     }
    // };


const generateCertificate = async () => {
  const certId = certificateId?.trim();

  const payload = {
    certificateId: certId,
    studentName: formData.studentName,
    courseId: courseObj?._id,
    courseTitle: courseName,
    instructorName: formData.instructorName,
    completionDate: formData.completionDate
  };

  try {
    // 1. Try to fetch the certificate by ID
    const response = await fetch(`https://your-backend.com/api/certificates/${certId}`);

    if (response.ok) {
      // ✅ Certificate already exists — use existing data
      const data = await response.json();
      setFormData({
        ...formData,
        ...data,
      });
    } else {
      // ❌ Certificate not found — create new one
      const createRes = await fetch(`https://your-backend.com/api/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const createdCert = await createRes.json();
      setFormData({
        ...formData,
        ...createdCert,
      });
    }

    // 2. Generate QR Code
    await QRCode.toCanvas(canvasRef.current, certId, { width: 90 });

    // 3. Mark ready and trigger download
    setCertificateReady(true);
    setTimeout(() => {
      downloadCertificate();
    }, 2000);
  } catch (err) {
    console.error('Certificate generation failed:', err);
    alert('Failed to generate or fetch certificate. Try again.');
  }
};










  const downloadCertificate = async () => {
    const element = certificateRef.current;

    if (!certificateReady || !element) {
        alert('Please generate the certificate before downloading.');
        return;
    }

    try {
        // Scroll to ensure rendering is complete
        element.scrollIntoView({ behavior: 'auto', block: 'center' });

        // Give time for DOM to paint (especially QR canvas, fonts, and image)
        await new Promise(resolve => setTimeout(resolve, 500)); // increased from 300 to 500

        const canvas = await html2canvas(element, {
            scale: 3, // high-res output
            useCORS: true,
            allowTaint: false, // safer rendering
            backgroundColor: '#ffffff',
            scrollY: -window.scrollY, // avoid scroll interference
        });

        const imageData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height],
        });

        pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${formData.studentName || 'certificate'}.pdf`);
    } catch (error) {
        console.error('Download failed:', error);
        alert('Failed to download certificate. Please try again.');
    }
};


    const printCertificate = () => {
        if (!certificateReady) {
            alert('Please generate the certificate before printing.');
            return;
        }
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-[Montserrat]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Course Certificate Generator</h1>
                    <p className="text-lg text-gray-600">Generate professional certificates for your completed courses</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="no-print bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Certificate Details</h2>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
                                <input
                                    type="text"
                                    id="studentName"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Course</label>
                                <p className="mt-1 p-2 text-gray-700 border border-gray-300 rounded-md bg-gray-100">
                                    {courseName}
                                </p>
                            </div>

                            <div>
                                <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">Completion Date</label>
                                <input
                                    type="date"
                                    id="completionDate"
                                    name="completionDate"
                                    value={formData.completionDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-gray-500"
                                />
                            </div>


                            <div>
                                <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700">Certificate ID</label>
                                <input
                                    type="text"
                                    id="certificateId"
                                    name="certificateId"
                                    value={certificateId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-gray-500"
                                />
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button onClick={generateCertificate} className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                                    Generate Certificate
                                </button>
                                <button onClick={printCertificate} className="rounded-md bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700">
                                    Print Certificate
                                </button>
                                <button
                                    onClick={downloadCertificate}
                                    className="rounded-md bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700"
                                >
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-start">
                        <div ref={certificateRef} className="w-full max-w-2xl p-8 rounded-lg shadow-lg border-8 border-yellow-400 bg-gradient-to-br from-white to-gray-100">
                            <div className="text-center mb-8">
                                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d20d6fcb-59d4-4645-a2e2-855dfcf3fb2f.png" alt="Logo" className="mx-auto h-24" />
                                <h2 className="text-2xl font-bold text-gray-800 mt-4">Certificate of Completion</h2>
                            </div>

                            <div className="text-center mb-8">
                                <p className="text-gray-600 mb-6">This is to certify that</p>
                                <h1 className="text-4xl font-bold text-indigo-800 mb-8 font-[Playfair Display]">{formData.studentName || 'Student Name'}</h1>
                                <p className="text-gray-600 mb-4">has successfully completed the course</p>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-8">{courseName}</h2>
                                <p className="text-gray-600 mb-4">on</p>
                                <p className="text-xl text-gray-700 mb-8">
                                    {formData.completionDate ? new Date(formData.completionDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : 'Month Day, Year'}
                                </p>
                                <p className="text-gray-600">This certificate is awarded on this day in recognition of dedication and accomplishment.</p>
                            </div>

                            <div className="grid grid-cols-3 items-end mt-12 gap-4">
                                <div className="text-center">
                                    <div className="h-1 w-24 mx-auto bg-gray-400 mb-2"></div>
                                    <p className="text-gray-800 font-semibold">{formData.instructorName || 'Online Learing'}</p>
                                    <p className="text-gray-600 text-sm">Instructor</p>
                                </div>

                                <div className="text-center">
                                    <img src={assets.CEO_Sign} alt="CEO Signature" className="h-10 mx-auto mb-2" />
                                    <p className="text-gray-800 font-semibold">ROHIT RAJ</p>
                                    <p className="text-gray-600 text-sm">Chief Executive Officer</p>
                                </div>

                                <div className="text-center">
                                    <div className="QR-Code w-24 h-24 mx-auto bg-yellow-300 flex items-center justify-center shadow-md rounded-full overflow-hidden">
                                        <canvas ref={canvasRef} width="90" height="90"></canvas>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-2">ID:{certificateId}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CertificateGenerator;