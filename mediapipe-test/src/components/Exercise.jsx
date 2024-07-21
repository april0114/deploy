import Timer from './Timer';
import Webcam from 'react-webcam';
import useMediaPipe from '../app/mediapipe/config';
import { useState, useEffect, useRef } from 'react';
import { SqutCount } from './SqutCount';
import { drawPoseLandmarks } from '../app/mediapipe/drawLandmarks';
import lungeClassifier from '../app/mediapipe/lunge.classifier';

const Exercise = () => {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isCameraStarted, setIsCameraStarted] = useState(false); // 카메라가 시작되었는지 여부를 추적
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const pose = useMediaPipe();
  const cameraRef = useRef(null); // camera 객체를 참조할 변수

  useEffect(() => {
    pose.onResults(onResults);

    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null
    ) {
      const camera = new window.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        facingMode: 'environment',
        width: 640,
        height: 600,
      });

      camera.start();
      cameraRef.current = camera; // camera 객체를 참조 변수에 저장

      cameraRef.current.video.onloadeddata = () => {
        setIsCameraStarted(true); // 카메라가 시작되면 상태를 true로 설정
      };
    }

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (isTimeUp && cameraRef.current) {
      cameraRef.current.stop();
    }
  }, [isTimeUp]);

  function onResults(results) {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (!results?.poseLandmarks) return;
    drawPoseLandmarks(canvasCtx, results, lungeClassifier);
    canvasCtx.restore();
  }

  const handleTimeUp = (timeUp) => {
    setIsTimeUp(timeUp);
  };

  return (
    <div>
      {isCameraStarted && <Timer onTimeUp={handleTimeUp} />}
      <section className="relative w-full h-[600px] px-20">
        <Webcam ref={webcamRef} className="hidden" />
        <canvas ref={canvasRef} className="object-cover w-full h-full" />
      </section>
      <SqutCount />
    </div>
  );
};

export default Exercise;
