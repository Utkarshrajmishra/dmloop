"use client";

import { useState } from "react";
import { Hourglass, Type } from "lucide-react";
import FloatNavItem from "./FloatNavItems";
import FloatNavButton from "./FloatNavButton";

const FloatNav = () => {
  const [activeTab, setActiveTab] = useState("time");
  const [activeSize, setActiveSize] = useState("10");

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-2 flex w-fit rounded-full bg-neutral-900/100 backdrop-blur-sm shadow-lg border border-neutral-800">
      <div className="flex items-center space-x-2">
        <FloatNavItem
          icon={<Hourglass className="size-5" />}
          label="Time Challegne"
          isActive={activeTab === "time"}
          onClick={() => setActiveTab("time")}
        />
        <FloatNavItem
          icon={<Type className="size-5" />}
          label="Word Challenge"
          isActive={activeTab === "text"}
          onClick={() => setActiveTab("text")}
        />
        <div className="w-px h-6 bg-neutral-700 mx-2" />
        <FloatNavButton
          size="10"
          isActive={activeSize === "10"}
          onClick={() => setActiveSize("10")}
        />
        <FloatNavButton
          size="15"
          isActive={activeSize === "15"}
          onClick={() => setActiveSize("15")}
        />
        <FloatNavButton
          size="20"
          isActive={activeSize === "20"}
          onClick={() => setActiveSize("20")}
        />
      </div>
    </div>
  );
};

export default FloatNav;
