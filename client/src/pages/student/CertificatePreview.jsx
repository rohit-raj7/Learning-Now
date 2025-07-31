import React from 'react';
import { assets } from '../../assets/assets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CertificatePreview = ({
    formData,
    certificateId,
    courseName,
    certificateRef,
    canvasRef,
    onGenerate,
    onDownload,
    onPrint,
    handleChange,
    certificateReady
}) => {
    const { studentName, completionDate, instructorName } = formData;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-[Montserrat]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Course Certificate Generator</h1>
                    <p className="text-lg text-gray-600">Generate professional certificates for your completed courses</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start">
                    {/* Certificate Input Form */}
                    <div className="no-print bg-white p-6 rounded-lg shadow-md w-full">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Certificate Details</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Student Name</label>
                                <input
                                    type="text"
                                    name="studentName"
                                    value={studentName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Course</label>
                                <p className="mt-1 p-2 bg-gray-100 rounded-md border border-gray-300 text-gray-700">{courseName}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                                <input
                                    type="date"
                                    name="completionDate"
                                    value={completionDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Certificate ID</label>
                                <input
                                    type="text"
                                    name="certificateId"
                                    value={certificateId}
                                    disabled
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-500 bg-gray-100"
                                />
                            </div>

                            <div className="flex gap-3 flex-wrap pt-2">
                                <button onClick={onGenerate} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium">
                                    Generate Certificate
                                </button>
                                <button onClick={onPrint} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium">
                                    Print
                                </button>
                                <button onClick={onDownload} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium">
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Preview */}
                    {certificateReady && (
                        <div className="flex justify-center items-start overflow-x-auto w-full">
                            <div
                                ref={certificateRef}
                                className="relative shadow-lg border-[10px] border-yellow-600 rounded-xl overflow-hidden min-w-[800px] h-[600px]"
                            >
                                <img
                                    src={assets.certificateBg}
                                    alt="Certificate Background"
                                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                                />

                                <div className="absolute inset-0 p-12 flex flex-col items-center text-center text-gray-800 font-serif">
                                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Certificate of Completion</h1>
                                    <p className="text-lg mb-2">This is to certify that</p>
                                    <h2 className="text-3xl font-bold text-indigo-800 my-4">{studentName || 'Student Name'}</h2>
                                    <p className="text-lg mb-2">has successfully completed the course</p>
                                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">{courseName}</h3>
                                    <p className="text-lg mb-1">on</p>
                                    <p className="text-lg text-gray-600 mb-4">
                                        {completionDate
                                            ? new Date(completionDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })
                                            : 'Month Day, Year'}
                                    </p>

                                    {/* Instructor Bottom Left */}
                                    <div className="absolute bottom-[6rem] left-[5rem] text-sm text-gray-700 italic text-left">
                                        <p className="text-gray-600">{instructorName || 'Instructor Name'}</p>

                                        <div className="border-b border-gray-300 my-2 w-32"></div>
                                        <p className="font-semibold">Instructor</p>
                                    </div>

                                    {/* CEO Signature */}
                                    <div className="absolute bottom-[5rem] left-1/2 transform -translate-x-1/2 text-center">
                                        <img src={assets.CEO_Sign} alt="CEO Signature" className="mx-auto mb-1 w-20" />
                                        <p className="font-semibold text-gray-800">Rohit Raj</p>
                                        <p className="text-sm text-gray-600">CEO, Online Learning</p>
                                    </div>

                                    {/* QR & Certificate ID */}
                                    <div className="absolute bottom-[3rem] right-[1rem] text-[11px] text-gray-600 italic text-left">
                                        <div className="w-24 h-24 bg-yellow-300 rounded-full shadow-md flex items-center justify-center overflow-hidden">
                                            <canvas ref={canvasRef} width="90" height="90"></canvas>
                                        </div>
                                        <p className="mt-2 break-words max-w-[13rem]">ID: {certificateId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CertificatePreview;