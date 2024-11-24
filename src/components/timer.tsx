import React, { useEffect } from "react";

interface TimerProps {
  timeRemaining: number;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({
  timeRemaining,
  isRunning,
  setIsRunning,
  setTimeRemaining,
}) => {
  useEffect(() => {
    let intervalId: any;

    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, timeRemaining, setTimeRemaining]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="-mt-7">
      <div className="funny-font">
        <h2
          className="funny-font text-[#272736]"
          style={{
            fontSize: "125px",
          }}
        >
          {formatTime(timeRemaining)}
        </h2>
      </div>
    </div>
  );
};

export default Timer;
