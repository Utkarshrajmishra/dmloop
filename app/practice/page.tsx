"use client";

import useWords from "@/hooks/useWord";
import { motion } from "framer-motion";
import FloatNav from "@/components/FloatNav";
import Result from "@/components/Result";
import UserTyping from "@/components/UserTyping";
import { useState } from "react";
import useEngine from "@/hooks/useEngine";

const Practice = () => {
  const [wordCount, setWordCount] = useState<number>(30);
  const { words } = useWords(wordCount);
  const { typed, timer, resetGame, currentState } = useEngine(words);

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
    <section className="relative bg-gradient-to-b from-neutral-900 to-black h-[100vh] flex items-center justify-center">
      <div className=" absolute max-w-4xl px-4 text-center md:text-left">
        <FloatNav
          reset={resetGame}
          setWordCount={setWordCount}
          wordCount={wordCount}
        />
        <div className="flex flex-col gap-8  items-center">
          {(currentState == "run" || currentState === "finish") && (
            <Result time={timer} wrm={75} accuracy={30} />
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
    </section>
  );
};

export default Practice;
