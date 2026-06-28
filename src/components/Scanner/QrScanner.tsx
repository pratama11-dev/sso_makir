import { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';

const QRCodeScanner = ({
  scan,
  onFinish,
}: {
  scan?: boolean;
  onFinish?: (e?: string) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    if (videoRef.current && scan) {
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result: QrScanner.ScanResult) => {
          if (onFinish) onFinish(result.data);
        },
        {
          onDecodeError: (error) => {
            console.error('Decode error:', error);
          },
          highlightScanRegion: true,
        }
      );

      qrScannerRef.current.start();
    }

    // Stop the scanner when the component is unmounted or when scan is set to false
    return () => {
      qrScannerRef.current?.stop();
      qrScannerRef.current = null;
    };
  }, [scan, onFinish]);

  useEffect(() => {
    if (!scan) {
      qrScannerRef.current?.stop();
      qrScannerRef.current = null;
    }
  }, [scan]);

  return (
    <div>
      {scan && <video ref={videoRef} style={{ width: '100%', height: 'auto' }}></video>}
    </div>
  );
};

export default QRCodeScanner;
