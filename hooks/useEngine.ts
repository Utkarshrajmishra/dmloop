import { useState } from "react";

export type gameState= "start" | "run" | "finish";

const useEngine=()=>{
    const [currentState, setCurrentState]=useState<gameState>("start")

    return {currentState, setCurrentState};
}

export default useEngine;