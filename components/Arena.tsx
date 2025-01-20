"use clinet"

import useEngine from "@/hooks/useEngine";
import useWords from "@/hooks/useWord";
import useWPM from "@/hooks/useWPM";
import { calculateAccuracyPercentage } from "@/lib/utils";
import { useState,useEffect } from "react";
import FinalResult from "./FinalResult";
import { motion } from "framer-motion";
import UserTyping from "./UserTyping";
import Result from "./Result";
import { DrawerCard } from "./Drawer";
import { WarriorType } from "@/app/multiplayer/war/[...slug]/page";

type ArenaProps = {
  users: WarriorType[]
  handleGetScore:()=>void;
  handleGameEnd: (wpm: number, error: number, time: number) => void;
};

const Arena=({users,handleGetScore, handleGameEnd}:ArenaProps)=>{

      const [dataSend, setDataSend]=useState(false)
      const [wordCount, setWordCount] = useState<number>(30);
      const { words } = useWords(wordCount);
      const { typed, timer, resetGame, currentState, errors } =
        useEngine(words, "arena",true);
      const { wpmHistory, latestWPM } = useWPM(typed, timer, currentState);

      useEffect(()=>{
          if(currentState==='finish' && !dataSend){
            handleGameEnd(
              latestWPM,
              calculateAccuracyPercentage(errors, words.length),
              timer
            );
            setDataSend(true)
          }
      },[currentState])


      useEffect(()=>{
        if(timer===30){
          handleGetScore()
        }
      },[timer])

        const containerVariants = {
          hidden: {
            opacity: 0,
            y: 50,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: "easeOut",
            },
          },
        };


    return (
      <>
        <section className="relative bg-gradient-to-b from-neutral-900 to-black min-h-[100vh] w-[100%] flex items-center justify-center">
          {currentState != "finish" ? (
            <div className=" absolute max-w-4xl px-4 text-center md:text-left">
              <div className="flex flex-col gap-8  items-center">
                {currentState == "run" && (
                  <Result
                    time={timer}
                    wpmScore={latestWPM}
                    accuracy={calculateAccuracyPercentage(errors, words.length)}
                  />
                )}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="relative text-lg md:text-2xl text-left font-mono tracking-wider leading-loose">
                    <UserTyping
                      word={words}
                      classes="absolute inset-0"
                      input={typed}
                    />
                    <h1 className="text-neutral-700 ">{words}</h1>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className=" min-w-[100%] mt-16"
            >
              <FinalResult
                multiplayer={true}
                currentState={currentState}
                resetGame={resetGame}
                totalWPM={latestWPM}
                time={timer}
                accuracy={calculateAccuracyPercentage(errors, words.length)}
                wpmHistory={wpmHistory}
              />
              <div className=" mt-4 flex items-center justify-center">
                <DrawerCard users={users} timer={timer}/>
              </div>
            </motion.div>
          )}
        </section>
      </>
    );
}

export default Arena