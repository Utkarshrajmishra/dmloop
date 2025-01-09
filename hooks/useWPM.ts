import { useState, useEffect } from "react";
import { gameState } from "./useEngine";

export type WPMType = {
  time: number;
  wpm: number;
};

const useWPM = (typed: string, timer: number, currentState: gameState) => {
  const [wpmHistory, setWPMHistory] = useState<WPMType[]>([]);

  useEffect(() => {
    if (currentState === "run" && timer > 0) {
      const minutes = timer / 60;
      const words = typed.length / 5; // 5 characters per word on average
      const currentWPM = Math.round(words / minutes);
      setWPMHistory((prev) => [...prev, { time: timer, wpm: currentWPM }]);
    }
  }, [typed, currentState, timer]);

  useEffect(() => {
    if (currentState === "start") {
      setWPMHistory([]);
    }
  }, [currentState]);

  const latestWPM =
    wpmHistory.length > 0 ? wpmHistory[wpmHistory.length - 1].wpm : 0;

  return { wpmHistory, latestWPM };
};

export default useWPM;
