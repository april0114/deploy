/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Timer = ({ onTimeUp }) => {
  const SECONDS_IN_MS = 30 * 1000; 
  const INTERVAL = 1000; // 1초마다 째깍째깍
  const [timeLeft, setTimeLeft] = useState(SECONDS_IN_MS);

  const seconds = String(Math.floor(timeLeft / 1000)).padStart(2, '0');

  useEffect(() => {
    setTimeLeft(SECONDS_IN_MS);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          if (onTimeUp) {
            onTimeUp(true); // 시간 초과 시 콜백 호출
          }
          return 0;
        }
        return prevTime - INTERVAL;
      });
    }, INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [onTimeUp]);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <p className="font-regular">시간 초과시 다시 받기</p>
      <p className="font-semibold">
        {seconds}
      </p>
    </div>
  );
};

export default Timer;
