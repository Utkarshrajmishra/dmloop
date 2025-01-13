import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
const Chat=()=>{
    return (
      <section className="w-[70%] flex flex-col justify-between  text-neutral-200 h-[85vh] mt-14 bg-neutral-900/50 outline outline-1 rounded-xl outline-neutral-800 p-6">
        <div className="text-2xl  items-center text-neutral-200 flex jusitfy-center gap-2 font-semibold font-mono">
          <MessageCircle className="size-7 text-sky-600" />
          <p>Chat</p>
        </div>
        <div>
          <form action="/" className="flex gap-1">
            <Input
              placeholder="Type a message..."
              className="flex h-9 font-mono w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
            />
            <button type="submit" className="">
              <div className="px-2 py-[6px] bg-emerald-900 rounded-md">
                <Send className="" />
              </div>
            </button>
          </form>
        </div>
      </section>
    );
}

export default Chat