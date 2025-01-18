"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSocket } from "@/context/SocketProvider";
import { useParams } from "next/navigation";
import { Hash, Copy, CirclePlay, Circle } from "lucide-react";
import Chat from "@/components/Chat";
import WarriorList from "@/components/WarriorList";
import Arena from "@/components/Arena";

export type WarriorType = {
  email: string;
  name: string;
  photoUrl: string;
  socketId: string;
  wpm: number,
  error:number,
  time:number,
};

export type ChatTypes = {
  name: string;
  msg: string;
  email: string;
};

const Page = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const params = useParams();
  const socket = useSocket();
  const [chat, setChat] = useState<ChatTypes[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { data: session } = useSession();
  const [warriors, setWarrior] = useState<WarriorType[]>([]);

  const handleNewUser = (user: WarriorType[]) => {
    setWarrior(user);
  };

  useEffect(() => {
    if (params?.slug && socket && session && !isConnected) {
      socket.emit("join_room", {
        room: params.slug[0],
        name: session.user?.name,
        email: session.user?.email,
        photoUrl: session.user?.image,
      });
      setIsConnected(true);

      socket?.on("users_updated", handleNewUser);

      socket?.on("message_recevied", handleNewMsg);

      socket?.on("game_started", handleStart);

      socket?.on("score_updated", handleScoreUpdate);

      return () => {
        if (socket && session?.user?.email && isConnected) {
          socket.emit("leave_room", {
            room: params?.slug?.[0],
            email: session?.user?.email,
          });
          socket.off("message_recevied", handleNewMsg);
          socket.on("game_started", handleStart);
          socket.off("users_updated", handleNewUser);
          setIsConnected(false);
        }
      };
    }
  }, [params?.slug, socket, session, isConnected]);

  const handleScoreUpdate=(warriors: WarriorType[])=>{
    setWarrior(warriors)
  }

  const handleStart = (data: boolean) => {
    setGameStarted(true);
  };

  const sendMsg = (msg: string) => {
    if (socket && session && params.slug)
      socket?.emit("message_sent", {
        msg: msg,
        name: session?.user?.name,
        room: params?.slug[0],
        email: session?.user?.email,
      });
  };

  const handleNewMsg = (msg: ChatTypes[]) => {
    console.log(msg);
    setChat(msg);
  };

  const handleGameStart = () => {
    if (socket && params?.slug && session) {
      socket.emit("start_game", params?.slug[0]);
    }
  };

  const handleGameEnd=(wpm: number, error: number, time:number)=>{
    if(socket && params?.slug && session){
      socket.emit("game_completed",{wpm:wpm, error:error, time:time, room:params?.slug[0], email:session?.user?.email});
    }
  }

  return (
    <section className="bg-gradient-to-b from-neutral-900 to-black min-h-screen pb-8 w-full flex justify-center">
      {gameStarted ? (
        <Arena handleGameEnd={handleGameEnd} startGame={gameStarted} />
      ) : (
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
                      20 Words - 30 Seconds
                    </p>
                  </div>
                  <button
                    onClick={handleGameStart}
                    className="flex items-center gap-3 font-semibold text-neutral-200 py-2 px-3 rounded-md font-mono bg-emerald-700 hover:bg-emerald-800"
                  >
                    <CirclePlay className="size-5" />
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
                  <Chat
                    Chat={chat}
                    userEmail={session?.user?.email}
                    sendMessage={sendMsg}
                  />
                  <WarriorList warriorList={warriors} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
