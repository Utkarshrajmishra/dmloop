import { useState } from "react";
import useTyping from "./useTyping";

export type gameState= "start" | "run" | "finish";

const useEngine=()=>{
    const [currentState, setCurrentState]=useState<gameState>("start")
    const {
      resetTotalTyped,
      clearTyped,
      keydownHandler,
      cursor,
      typed,
      totalTyped,
    } = useTyping(currentState !== "finish");
    return {currentState, setCurrentState};
}

export default useEngine;