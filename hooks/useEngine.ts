import { useCallback, useEffect, useState } from "react";
import useTyping from "./useTyping";
import useTimer from "./useTimer";
import useAccuracy from "./useAccuracy";

export type gameState = "start" | "run" | "finish";

const useEngine = (word: string, mode: string, multiplayerWar: boolean) => {
  const [currentState, setCurrentState] = useState<gameState>("start");
  const { errors, getError } = useAccuracy(word);

  const {
    resetTotalTyped,
    clearTyped,
    keydownHandler,
    cursor,
    typed,
    totalTyped,
  } = useTyping(currentState !== "finish");

  const { timer, startTimer, resetTimer } = useTimer(
    word.length,
    typed.length,
    multiplayerWar
  );

  const [error, setError] = useState(0);
  const isStarted =
    mode == "arena"
      ? multiplayerWar == true
      : currentState === "start" && cursor > 0;

  const sumErrors = useCallback(() => {
    getError(cursor, typed);
  }, [typed, cursor, word]);

  useEffect(() => {
    if (currentState == "run" && typed.length > 0) {
      sumErrors();
    }
  }, [typed, currentState, getError, cursor]);

  useEffect(() => {
    if (isStarted) {
      setCurrentState("run");
      startTimer();
    }
  }, [isStarted, cursor]);

  useEffect(() => {
    if (mode === "arena" && timer === 30) {
      return setCurrentState("finish");
    }
    if (currentState === "run" && typed.length >= word.length) {
      setCurrentState("finish");
    }
  }, [typed.length, word.length, currentState, sumErrors]);

  const resetGame = useCallback(() => {
    setCurrentState("start");
    resetTimer();
    clearTyped();
    resetTotalTyped();
    setError(0);
  }, [resetTimer, clearTyped, resetTotalTyped]);

  return { currentState, setCurrentState, typed, timer, resetGame, errors };
};

export default useEngine;
