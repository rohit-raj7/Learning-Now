 
import QRCode from 'qrcode';
export const getQrURL = (domainURL, certificateId) => {
  return `${domainURL}/qr/${certificateId}`;
};

export const generateQRCode = async (canvasRef, domainURL, certificateId) => {
  if (canvasRef?.current && certificateId) {
    const qrURL = getQrURL(domainURL, certificateId);
    try {
      await QRCode.toCanvas(canvasRef.current, qrURL, { width: 90 });
    } catch (err) {
      console.error('QR code generation failed:', err);
    }
  }
};
