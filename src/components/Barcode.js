import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { getBook, setIsbn } from '../redux/ISBN/isbn';
import { useDispatch } from 'react-redux';
import Books from './Books';

const Barcode = () => {
  const video = useRef(null);
  const canvas = useRef(null);
  const [barcode, setBarcode] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsbn(barcode);
    if (barcode !== null) {
      dispatch(getBook);
    }
  }, [barcode]);

  const openCam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, heigth: 720 } })
      .then((capture) => {
        video.current.srcObject = capture;
        video.current.play();

        const captureContent = canvas.current.getContext('2d');
        const barcodeTypes = new window.BarcodeDetector({
          formats: [
            'aztec',
            'code_128',
            'code_39',
            'code_93',
            'codabar',
            'data_matrix',
            'ean_13',
            'ean_8',
            'itf',
            'pdf417',
            'qr_code',
            'upc_a',
            'upc_e',
            'unknown',
          ],
        });

        setInterval(() => {
          canvas.current.width = video.current.videoWidth;
          canvas.current.height = video.current.videoHeight;
          captureContent.drawImage(
            video.current,
            0,
            0,
            video.current.videoWidth,
            video.current.videoHeight,
          );
          barcodeTypes
            .detect(canvas.current)
            .then(([data]) => {
              if (data) {
                setBarcode(data.rawValue);
              }
            })
            .catch((err) => console.log(err));
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  const closeCam = () => {
    const stream = video.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });

    video.srcObject = null;
  };

  return (
    <>
      <button onClick={openCam}>Open Camera</button>
      <button onClick={closeCam}>Close Camera</button>
      <video ref={video} autoPlay muted hidden />
      <canvas ref={canvas} />
      {barcode && <div>Barcode Number: {barcode}</div>}
      <Books />
    </>
  );
};

export default Barcode;
