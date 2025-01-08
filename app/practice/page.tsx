"use client";

import useWords from "@/hooks/useWord";
import { motion } from "framer-motion";
import FloatNav from "@/components/FloatNav";
import Result from "@/components/Result";

const Practice = () => {
  const { words, updateWords } = useWords(30);

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
        <FloatNav />
        <div className="flex flex-col gap-8  items-center">
          <Result time={10} wrm={75} accuracy={30}/>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-neutral-700 text-lg md:text-2xl text-center font-mono tracking-wider leading-loose">
              {words}
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Practice;
