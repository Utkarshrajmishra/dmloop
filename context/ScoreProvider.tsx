import { createContext, Dispatch, SetStateAction, useState } from "react";

type UserScore={
    wpm:number,
    error:number,
    time:number,
    status:boolean
}

type UserContextTypes={
    score:UserScore,
    setScore:Dispatch<SetStateAction<UserScore>>
}

const ScoreContext=createContext<UserContextTypes | null>(null)

const ScoreProvider=({children}:{children:React.ReactNode})=>{
    const [score,setScore]=useState<UserScore>({wpm: 0, error:0, time:0, status:false})
    return(
        <ScoreContext.Provider value={{score, setScore}}>
            {children}
        </ScoreContext.Provider>
    )
}