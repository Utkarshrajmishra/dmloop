import { useCallback, useEffect, useState } from "react";
import useTyping from "./useTyping";
import { countErrors } from "@/lib/utils";
import useTimer from "./useTimer";

 type gameState= "start" | "run" | "finish";

const useEngine=(word:string)=>{
    const [currentState, setCurrentState]=useState<gameState>("start")
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
      typed.length
    );

    const [error, setError]=useState(0)
    const isStarted=currentState==="start" && cursor>0;

    const sumErrors=useCallback(()=>{
        const wordReached=word.substring(0,cursor);
        setError((prev)=> prev+countErrors(wordReached, typed))
    },[typed, cursor, word])

    useEffect(()=>{
            if(isStarted){
                setCurrentState("run");
                startTimer();
            }
    },[isStarted, cursor])

    useEffect(()=>{
        if(currentState==='run' && typed.length>=word.length){
            setCurrentState("finish");
            sumErrors();
        }
    },[typed.length, word.length, currentState, sumErrors])


    const resetGame=useCallback(()=>{
        setCurrentState("start");
        resetTimer();
        clearTyped();
        resetTotalTyped();
        setError(0)
    },[resetTimer, clearTyped, resetTotalTyped])

    return {currentState, setCurrentState, typed, timer, resetGame};
}

export default useEngine;