"use client";

import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const generateWords = (count: number) => {
  return faker.word.words(count).toLowerCase();
};

const useWords = (initialCount: number) => {
  const [words, setWords] = useState<string>("");
    const [wordCount, setWordCount] = useState<number>(initialCount);

   useEffect(()=>{
    setWords(generateWords(initialCount))
   },[initialCount])

  
  return { words, wordCount };
};

export default useWords;
