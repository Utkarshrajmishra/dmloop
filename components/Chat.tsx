"use clinet";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { ChatTypes } from "./War";

type ChatProps = {
  sendMessage: (msg: string) => void;
  Chat: ChatTypes[];
  userEmail: string | null | undefined;
};

const Chat = ({ sendMessage, Chat, userEmail }: ChatProps) => {
  const [msg, SetMsg] = useState("");

  const handleSendMessage=()=>{
    sendMessage(msg);
    SetMsg("")
  }

  return (
    <section className="w-[60%] flex flex-col justify-between  text-neutral-200 h-[85vh] mt-4 bg-neutral-900/50 outline outline-1 rounded-xl outline-neutral-800 p-6">
      <div className="text-2xl  items-center text-neutral-200 flex jusitfy-center gap-2 font-semibold font-mono">
        <MessageCircle className="size-7 text-sky-600" />
        <p>Chat</p>
      </div>
      <div>
        <div className="flex flex-col gap-6 h-[60vh] overflow-y-scroll">
          {userEmail &&
            Chat?.map((items, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  items.email === userEmail ? "items-end" : "items-start"
                }`}
              >
                <p className="text-sm text-neutral-500">
                  {items.email === userEmail ? "You" : items.name}
                </p>
                <div className="bg-neutral-900 max-w-[300px] font-inter w-fit text-neutral-200  py-2 px-4 rounded">
                  <p className="text-sm font-inter">{items.msg}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <form action={handleSendMessage} className="flex gap-1">
          <Input
            value={msg}
            onChange={(e) => SetMsg(e.target.value)}
            placeholder="Type a message..."
            className="flex h-9 font-mono w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
          />
          <button disabled={msg == ""} type="submit">
            <div className="px-2 py-[6px] bg-emerald-900 rounded-md">
              <Send className="" />
            </div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Chat;
