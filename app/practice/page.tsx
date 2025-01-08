"use client";

import useWords from "@/hooks/useWord";
import { motion } from "framer-motion";

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
    <section className="bg-neutral-900 h-[100vh] flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl px-4 text-center md:text-left"
      >
        <h1 className="text-neutral-700 text-lg md:text-2xl font-giest tracking-wider leading-loose">
          {words}
        </h1>
      </motion.div>
    </section>
  );
};

export default Practice;
