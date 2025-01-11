import { auth } from "@/auth";
import ArenaCard from "@/components/ArenaCard";
import { Button } from "@/components/ui/button";
import { Swords } from "lucide-react";

const Multiplayer =async() => {
  const session= await auth()
  
  return (
    <section className=" bg-gradient-to-b from-neutral-900 to-black min-h-[100vh] w-[100%] flex justify-center">
      <div className="w-[80%] lg:w-[70%] items-center">
        <div className="mt-20">
          <p className="text-neutral-200 flex gap-2 text-3xl font-mono font-semibold">
            <span>
              <Swords className="size-8" />
            </span>{" "}
            Multiplayer War
          </p>
          <div className="flex gap-6 mt-8">
            <ArenaCard
              session={session?.id }
              title={"Create Arena"}
              showSelectors={true}
              buttonText="Create Arena"
            />
            <ArenaCard
            session={session?.id}
              title={"Join Arena"}
              showSelectors={false}
              buttonText="Join Arena"
            />
          </div>
        </div>
        <div className="rounded-xl mt-8 w-full gap-4 border text-card-foreground  shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg flex  flex-col p-7">
          <p className="text-neutral-200 font-mono text-xl font-semibold ">
            Speed Challenge
          </p>
          <div>
            <div className="w-full h-16 px-4 bg-neutral-800 rounded flex items-center outline outline-1 outline-neutral-700 justify-between">
              <div className="text-neutral-500 font-inter flex gap-4">
                <p className="text-xl font-mono  font-semibold">
                  {" "}
                  <span className="text-neutral-200">Challage 1</span>:{" "}
                </p>
                <p>
                  <span className="text-xl text-neutral-200 font-mono font-semibold">
                    20
                  </span>{" "}
                  words -{" "}
                  <span className="text-xl text-neutral-200 font-semibold font-mono">
                    30
                  </span>{" "}
                  sec
                </p>
              </div>
              <Button  className="px-8 bg-emerald-700 hover:bg-emerald-800 text-neutral-200 font-mono">
                Comming Soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Multiplayer;
