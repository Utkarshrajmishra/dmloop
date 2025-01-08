"use clinet"

import { useCallback, useEffect, useRef, useState } from "react";

const useTimer = (time: number) => {
  const [timer, setTimer] = useState(0); 
  const timerRef = useRef<ReturnType<typeof setInterval> | null | null>(null);
  const timerEnded = timer >= time;
  const isRunning = timerRef.current !== null;

  const startTimer = useCallback(() => {
    if (!timerEnded && !isRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000); 
    }
  }, [timerEnded, isRunning]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimer(0);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { timer, startTimer, resetTimer };
};

export default useTimer;
