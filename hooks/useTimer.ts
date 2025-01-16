// useTimer.ts
import { useCallback, useEffect, useRef, useState } from "react";

const useTimer = (
  generatedWordLength: number,
  userInputWordLength: number,
  multiplayerWar: boolean
) => {
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isComplete = multiplayerWar
    ? timer >= 30
    : userInputWordLength >= generatedWordLength;
  const isRunning = timerRef.current !== null;

  const startTimer = useCallback(() => {
    if (!isComplete && !isRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (multiplayerWar && prev >= 29) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    }
  }, [isComplete, isRunning]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimer(0);
  }, []);

  useEffect(() => {
    if (isComplete && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [isComplete]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isComplete]);

  return {
    timer,
    startTimer,
    resetTimer,
    isFinished: isComplete,
  };
};

export default useTimer;
