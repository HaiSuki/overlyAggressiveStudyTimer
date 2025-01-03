import { useEffect, useState } from "react";
import "./css/globals.css";
import StartupModal from "./components/startupPopup";
import Timer from "./components/timer";
import { Input } from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider";

import { useAnimate } from "react-simple-animate";
import { RaisingText } from "./components/raisingText";
import MusicManager from "./components/MusicManager";

const convertTime = (time: string) => {
  console.log(time);
  const [minutes, seconds] = time.split(":").map(Number);
  const timeReal = minutes * 60 + seconds;

  if (isNaN(timeReal)) {
    return 0;
  }

  return timeReal;
};

function App() {
  const [relays, setRelays] = useState(0);
  const [studyTime, setStudyTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [isAngry, setIsAngry] = useState(false);
  const [prevMousePos, setPrevMousePos] = useState({ x: 0, y: 0 });

  const [isBreak, setIsBreak] = useState(false);
  const [setTimeRemaining, setSetTimeRemaining] = useState(studyTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // animation fo suki to move to the middle
  const sukiMoveToMiddle = useAnimate({
    start: {
      transform: "translate(0, 0)",
      position: "fixed",
      right: "0",
      bottom: "0",
    },
    end: {
      transform: "translate(-50%, 0)",
      position: "fixed",
      left: "55%",
      bottom: "0",
    },
    easeType: "cubic-bezier(0.4, 0, 0.2, 1)",
    duration: 2,
  });
  //--------------------------------------------

  useEffect(() => {
    // part of the timer + checking for break or study time
    if (isTimerRunning && setTimeRemaining === 0) {
      if (relays + 1 <= 0 && isBreak) {
        setIsBreak(false);
        setSetTimeRemaining(studyTime);
        setIsTimerRunning(false);
        setRelays(0);
        sukiMoveToMiddle.play(false);
        return;
      }
      const isBreaking = !isBreak;
      setIsBreak(isBreaking);
      setSetTimeRemaining(isBreaking ? breakTime : studyTime);
      setRelays((prev) => prev - 1);

    }
  }, [setTimeRemaining, isBreak, breakTime, studyTime, relays]);

  useEffect(() => {
    if (isTimerRunning) {
      sukiMoveToMiddle.play(true);
    }
  }, [isTimerRunning]);

  useEffect(() => {

    const MouseMove = (event: MouseEvent) => {
      const dx = event.clientX - prevMousePos.x;
      const dy = event.clientY - prevMousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 50 && !isBreak && !isAngry && isTimerRunning) {
        setIsAngry(true);
      }

      setPrevMousePos({ x: event.clientX, y: event.clientY });
    }

    const visibilitychange = () => {
      if (document.hidden && !isAngry && isTimerRunning && !isBreak) {
        setIsAngry(true);
      }
    }

    document.addEventListener("mousemove", MouseMove);

    document.addEventListener("visibilitychange", visibilitychange);

    const interval = setInterval(() => {
      if (isAngry) {
        setIsAngry(false);
      }
    }, 2000);

    return () => {
      document.removeEventListener("mousemove", MouseMove);
      document.removeEventListener("visibilitychange", visibilitychange);
      clearInterval(interval);
    };
  }, [isAngry, prevMousePos, isTimerRunning, isBreak]);

  // this bit is the startup window and allat
  return (
    <>
      <div
        className={`${isBreak ? "bg-[#E5D1B5]" : (isAngry ? "bg-[#FF9696]" : "bg-[#BFB7E4]")} h-screen w-screen`}
      >
        <MusicManager isAngry={isAngry} isBreaking={isBreak} isTimerRunning={isTimerRunning} />
        <div style={{ zIndex: 99999 }}>
          <RaisingText isBreak={isBreak} isWelcome={!isTimerRunning} isAngry={isAngry}/>
        </div>
        <StartupModal />
        <div className="justify-center items-center text-center w-full pt-4">
          <h1
             className="funny-font text-[#42425F]"
            style={{
              fontSize: "60px",
            }}
          >
            {isBreak
              ? "break time :p"
              : isTimerRunning
              ? (isAngry ? "GET BACK TO WORK!" : `studying${['...', '..', '.'][Math.floor((Date.now() / 500) % 3)]}`)
              : "welcome!"}
          </h1>

          <Timer
          isAngry={isAngry}
            timeRemaining={setTimeRemaining}
            isRunning={isTimerRunning}
            setIsRunning={setIsTimerRunning}
            setTimeRemaining={setSetTimeRemaining}
          />
        </div>

        <img
          src={`${isBreak ? "/sukiSnooze.gif" : (isAngry ? "/sukiANGRY.gif" : "/sukiChill.gif")}`}
          style={sukiMoveToMiddle.style}
          className="pointer-events-none z-50"
        />
        {/* setting study time */}
        <div
          className={`absolute bottom-72 left-3 ${isTimerRunning ? "hidden" : ""}`}
        >
          <h2
            className="funny-font text-[#272736]"
            style={{
              fontSize: "30px",
            }}
          >
            set your study time
          </h2>
          <div className="bg-[#D7D7DB] p-2 w-[325px] h-[100px] border-8 border-[#7E7E8F] z-10 text-[#272736]">
            <Input
              onChange={(ev) => {
                setStudyTime(convertTime(ev.target.value));
                setSetTimeRemaining(convertTime(ev.target.value));
              }}
              placeholder="e.g 20:00"
              className="funny-font w-full h-full text-5xl text-[#272736]"
            />
          </div>
        </div>
        {/* setting break time*/}
        <div
          className={`absolute bottom-28 left-3 ${isTimerRunning ? "hidden" : ""}`}
        >
          <h2
            className="funny-font text-[#272736]"
            style={{
              fontSize: "30px",
            }}
          >
            set your break!!!
          </h2>
          <div className="bg-[#D7D7DB] p-2 w-[325px] h-[100px] border-8 border-[#7E7E8F] z-10 text-[#272736]">
            <Input
              onChange={(ev) => {
                setBreakTime(convertTime(ev.target.value));
              }}
              placeholder="e.g 05:00"
              className="funny-font w-full h-full text-5xl text-[#272736]"
            />
          </div>
        </div>
        {/* setting the relays*/}
        <div
          className={`absolute bottom-6 left-6 ${isTimerRunning ? "hidden" : ""}`}
        >
          <h2
            className="funny-font text-[#272736]"
            style={{
              fontSize: "30px",
            }}
          >
            relays: {relays}
          </h2>
          <Slider
            onChange={(event) => {
              // @ts-ignore
              setRelays(Math.floor((event.target.value as number) / 10));
            }}
            defaultValue={[0]}
            className="w-[280px]"
          />
        </div>

        <img
          style={{
            transform: "translate(0, 50px)",
            position: "fixed",
            right: "0",
            bottom: "60%",
          }}
          src="/startButton2.png"
          className={`absolute z-50 cursor-pointer w-[400px] animateUpAndDown ${isTimerRunning ? "hidden" : ""} `}
          onClick={() => {
            if (studyTime === 0 || breakTime === 0) {
              return;
            }
            setIsTimerRunning(true);
          }}
        />
      </div>
    </>
  );
}
// wowee! oh my gah!

export default App;
