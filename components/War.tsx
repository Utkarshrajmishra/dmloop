"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSocket } from "@/context/SocketProvider";
import { useParams, useRouter } from "next/navigation";
import { Hash, Copy, CirclePlay, LoaderCircle } from "lucide-react";
import Chat from "@/components/Chat";
import WarriorList from "@/components/WarriorList";
import Arena from "@/components/Arena";
import { sortUser } from "@/lib/utils";
import { Alert } from "@/components/Alert";
import { useToast } from "@/hooks/use-toast";
import {motion} from "framer-motion"

export type WarriorType = {
  email: string;
  name: string;
  photoUrl: string;
  socketId: string;
  wpm: number;
  error: number;
  time: number;
};

export type ChatTypes = {
  name: string;
  msg: string;
  email: string;
};

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


export const War = ({ auth }: any) => {
  const router = useRouter();
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const params = useParams();
  const socket = useSocket();
  const [alert, setAlert] = useState(false);
  const [chat, setChat] = useState<ChatTypes[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { data: session, status } = useSession();
  const [warriors, setWarrior] = useState<WarriorType[]>([]);

  useEffect(() => {
    if (!auth) {
      router.push("/multiplayer");
    }
  }, [auth]);

  const handleNewUser = (user: WarriorType[]) => {
    setWarrior(user);
    setIsConnected(true);
  };

  useEffect(() => {
    if (params?.slug && socket && session && !isConnected) {
      socket.emit("join_room", {
        room: params.slug[0],
        name: session.user?.name,
        email: session.user?.email,
        photoUrl: session.user?.image,
      });

      socket?.on("users_updated", handleNewUser);

      socket?.on("message_recevied", handleNewMsg);

      socket?.on("game_started", handleStart);

      socket?.on("scores", handleScoreUpdate);

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
          router.back()
        }
      };
    }
  }, [params?.slug, socket, session, isConnected]);

  const handleScoreUpdate = (warriors: WarriorType[]) => {
    const users = sortUser(warriors);
    setWarrior(users);
  };

  const handleGetScore = () => {
    if (socket && session && params.slug) {
      socket?.emit("send_score", params?.slug[0]);
    }
  };

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
    if (!auth) {
      toast({
        variant: "destructive",
        className: "bg-neutral-950 text-white border border-neutral-700",
        title: "Login is required!",
        description: "Login is required to perform this action.",
      });
      return;
    }
    if (socket && params?.slug && session) {
      socket.emit("start_game", params?.slug[0]);
    }
  };

  const handleGameEnd = (wpm: number, error: number, time: number) => {
    if (socket && params?.slug && session) {
      console.log("emit");
      socket.emit("game_completed", {
        wpm: wpm,
        error: error,
        time: time,
        room: params?.slug[0],
        email: session?.user?.email,
      });
    }
  };

  const copyToClipBoard=()=>{
    if(params && params?.slug){
      navigator.clipboard.writeText(params?.slug[0])
    }
  }

  return (
    <>
      {" "}
      <section className="bg-gradient-to-b text-white  from-neutral-900 to-black min-h-[100vh] pb-8 w-full flex justify-center">
        {isConnected ? (
          gameStarted ? (
            <Arena
              users={warriors}
              handleGetScore={handleGetScore}
              handleGameEnd={handleGameEnd}
            />
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
                      {warriors[0].email == auth?.user?.email && (
                        <button
                          onClick={handleGameStart}
                          className="flex items-center gap-3 font-semibold text-neutral-200 py-2 px-3 rounded-md font-mono bg-emerald-700 hover:bg-emerald-800"
                        >
                          <CirclePlay className="size-5" />
                          Get Started
                        </button>
                      )}
                    </div>
                    <div className="text-neutral-400 flex gap-4 items-center mt-2">
                      <Hash className="size-6" />
                      <p className="font-mono">Room Code: {params.slug[0]}</p>
                      <Copy
                        onClick={copyToClipBoard}
                        className="size-5 cursor-pointer hover:text-neutral-200"
                      />
                    </div>
                    {/* Horizontal divider */}
                    <div className="w-full h-[0.5px] bg-neutral-800 mt-4"></div>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="flex gap-2">
                        <Chat
                          Chat={chat}
                          userEmail={session?.user?.email}
                          sendMessage={sendMsg}
                        />
                        <WarriorList warriorList={warriors} />
                      </div>
                    </motion.div>
                  </div>
                ) : null}
              </div>
            </div>
          )
        ) : (
          <div className="flex h-screen items-center text-neutral-200 justify-center flex-col gap-1">
            <div className="animate-spin">
              <LoaderCircle className="size-6" />
            </div>
            <p className="font-medium">Please wait...</p>
            <div>
              <p className="text-sm font-inter text-gray-400">
                Establishing a secure connection
              </p>
              <p className="text-xs text-gray-400 text-center mt-2">
                This may take a moment
              </p>
            </div>
          </div>
        )}
      </section>
      <Alert state={alert} setState={setAlert} />
    </>
  );
};
