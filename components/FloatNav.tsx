"use client";

import { useEffect, useState } from "react";
import { Hourglass, Type } from "lucide-react";
import FloatNavItem from "./FloatNavItems";
import FloatNavButton from "./FloatNavButton";
import useWords from "@/hooks/useWord";

type FloatNavProps={
    reset:()=>void;
    setWordCount:(count: number)=>void;
    wordCount: number;
}

const FloatNav = ({reset,setWordCount, wordCount}:FloatNavProps) => {
  const [activeTab, setActiveTab] = useState("text");
  const [activeSize, setActiveSize] = useState<number>(20);

  const changeSize=(size:number)=>{

      setWordCount(size)
        reset()
  }

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-2 flex w-fit rounded-full backdrop-blur-sm shadow-lg border border-neutral-800">
      <div className="flex items-center space-x-2">
        {/* <FloatNavItem
          icon={<Hourglass className="size-5" />}
          label="Time Challegne"
          isActive={activeTab === "time"}
          onClick={() => setActiveTab("time")}
        /> */}
        <FloatNavItem
          icon={<Type className="size-5" />}
          label="Word Count"
          isActive={activeTab === "text"}
          onClick={() => setActiveTab("text")}
        />
        <div className="w-px h-6 bg-neutral-700 mx-2" />
        <FloatNavButton
          size="30"
          isActive={wordCount === 30}
          onClick={() => changeSize(30)}
        />
        <FloatNavButton
          size="50"
          isActive={wordCount === 50}
          onClick={() => changeSize(50)}
        />
        <FloatNavButton
          size="70"
          isActive={wordCount === 70}
          onClick={() => changeSize(70)}
        />
      </div>
    </div>
  );
};

export default FloatNav;
