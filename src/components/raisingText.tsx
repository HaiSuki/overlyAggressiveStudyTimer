import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RaisingTextProps {
  isBreak: boolean;
  onComplete?: () => void;
  isWelcome: boolean; // Add this new prop
}

const studyMessages = [
  "productivity ....",
  "u got this champ",
  "you better keep studying",
  "not long left",
  "keep at it",
];

const breakMessages = [
  "well done!",
  "take a break",
  "zzzz",
  "honk mi mi mi mi",
  "reward yourself",
  "you should be proud",
  "good job",
];

const angryMessages = [
  "GET BACK TO WORK",
  "STOP SLACKING",
  "START WORKING",
  "STUDY STUDY STUDY",
  "HOW WILL YOU SUCCEED",
  "U WILL REGRET THIS",
  "AAAAAAAAAAAAAAAAAAAAAAA",
];
// ----------------------------

const generateSideBiasedPosition = (width: number): number => {
  const random = Math.random();
  // If random < 0.9, generate position on sides (45% chance for each side)
  if (random < 0.9) {
    // Choose left or right side
    if (random < 0.45) {
      // Left side: 0 to 20% of screen width
      return Math.random() * (width * 0.2);
    } else {
      // Right side: 80% to 100% of screen width
      return width * 0.8 + Math.random() * (width * 0.2);
    }
  }
  // Middle area: 20% to 80% of screen width (reduced probability)
  return width * 0.2 + Math.random() * (width * 0.6);
};

const Message: React.FC<{ 
  message: string; 
  x: number; 
  isBreak: boolean;
  delay: number;
}> = ({ message, x, isBreak, delay }) => {
  return (
    <motion.div
      initial={{ y: 2000 }}
      animate={{ y: [2000, 0, 2000] }}
      transition={{ 
        duration: 6, 
        ease: "easeInOut", 
        repeat: Infinity, 
        repeatType: "loop",
        delay: delay 
      }}
      style={{
        position: "absolute",
        zIndex: 99999,
        left: `${x}px`,
        bottom: "20%",
        transform: "translateX(-50%)",
        fontWeight: "lighter",
        color: isBreak ? "#272736" : "#272736",
      }}
      className="funny-font"
    >
      {message}
    </motion.div>
  );
};

export const RaisingText: React.FC<RaisingTextProps> = ({
  isBreak,
  onComplete,
  isWelcome,
}) => {


    const [messagePositions, setMessagePositions] = useState<{ x: number; message: string; delay: number; }[]>([])
    const GenerateMessagePos = () => {
    const count = Math.floor(Math.random() * 3) + 2;
    const screenWidth = window.innerWidth;
    const messageArray = isBreak ? breakMessages : studyMessages;
    
    return Array.from({ length: count }, (_, index) => ({
      x: generateSideBiasedPosition(screenWidth),
      message: messageArray[Math.floor(Math.random() * messageArray.length)],
      delay: index * 0.5 // Add 0.5 second delay between each message
    }));
  }

  useEffect(() => {
    const messages = GenerateMessagePos();
    setMessagePositions(messages);

  }, [isBreak, isWelcome])



  // Don't show any messages during welcome screen
  if (isWelcome) {
    return null;
  }




  return (
    <>
      {messagePositions.map((pos, index) => (
        <Message
          key={index}
          message={pos.message}
          x={pos.x}
          isBreak={isBreak}
          delay={pos.delay}
        />
      ))}
    </>
  );
};
