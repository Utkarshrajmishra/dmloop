"use client";
import { useSocket } from "@/context/SocketProvider";
import { useParams } from "next/navigation";
import { Hash, Copy, CirclePlay, Circle } from "lucide-react";
import Chat from "@/components/Chat";
import WarriorList from "@/components/WarriorList";

const Page = () => {
  const params = useParams();

  return (
    <section className="bg-gradient-to-b from-neutral-900 to-black min-h-screen pb-8 w-full flex justify-center">
      <div className="w-[80%] lg:w-[70%] items-center">
        <div className="mt-20">
          {params?.slug ? (
            <div className=" flex flex-col gap-2">
              <div className="flex  justify-between">
                <div className="flex items-center gap-3">
                  <p className="text-3xl text-neutral-200 font-mono font-bold">
                    {params.slug[0]}
                  </p>
                  {/* Vertical divider */}
                  <div className="w-1 h-8 bg-neutral-200"></div>
                  <p className="text-3xl flex gap-2 text-neutral-200 font-mono font-bold">
                    20 Words
                  </p>
                </div>
                <button className="flex items-center gap-3 font-semibold text-neutral-200 py-2 px-3 rounded-md font-mono bg-emerald-700 hover:bg-emerald-800">
                  <CirclePlay className="size-5"/>
                  Get Started
                </button>
              </div>
              <div className="text-neutral-400 flex gap-4 items-center mt-2">
                <Hash className="size-6" />
                <p className="font-mono">Room Code: {params.slug[0]}</p>
                <Copy className="size-5 cursor-pointer hover:text-neutral-200" />
              </div>
              {/* Horizontal divider */}
              <div className="w-full h-[0.5px] bg-neutral-800 mt-4"></div>
              <div className="flex gap-2">
                <Chat />
                <WarriorList />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Page;
