import { useRef, useEffect } from 'react';

const App = () => {
  let video = useRef(null);
  let canvas = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, heigth: 720 } })
      .then((capture) => {
        video.current.srcObject = capture;
        video.current.play();

        const captureContent = canvas.current.getContext('2d');

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
        }, 100);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <video ref={video} autoPlay muted hidden />
      <canvas ref={canvas} />
    </>
  );
};

export default App;
