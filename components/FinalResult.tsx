import { WPMType } from "@/hooks/useWPM";
import { Hourglass, Target, Gauge, RotateCcw } from "lucide-react";
import Chart from "./Chart";
import { Button } from "./ui/button";
export type FinalResultProps = {
  resetGame:()=>void;
  totalWPM: number;
  time: number;
  accuracy: number;
  wpmHistory: WPMType[];
};

const FinalResult = ({
  resetGame,
  time,
  accuracy,
  wpmHistory,
}: FinalResultProps) => {
  return (
    <>
      <div className="flex justify-center gap-6 h-[100vh] flex-col items-center">
        <div className="flex md:w-[80%] lg:w-[60%] justify-between">
          <div className="rounded-xl  w-[250px] gap-3 border text-card-foreground  shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50 flex items-center py-6 px-9">
            <Target className="size-8 text-purple-500" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-400 uppercase">
                ACCURACY
              </p>
              <p className="font-bold text-2xl text-neutral-200">{`${accuracy}%`}</p>
            </div>
          </div>
          <div className="rounded-xl gap-3 border text-card-foreground w-[250px] shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50 flex items-center py-6 px-9">
            <Hourglass className="size-8 text-sky-500" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-400 uppercase">
                TIME
              </p>
              <p className="font-bold text-2xl text-neutral-200">{`${time}s`}</p>
            </div>
          </div>
          <div className="rounded-xl gap-3 border text-card-foreground w-[250px] shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50 flex items-center py-6 px-9">
            <Gauge className="size-8 text-emerald-500" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-400 uppercase">
                WPM
              </p>
              <p className="font-bold text-2xl text-neutral-200">{`${accuracy}`}</p>
            </div>
          </div>
        </div>
        <Chart wpmHistory={wpmHistory} />
        <form action={resetGame}>
          <Button type="submit" className="bg-black outline outline-1 outline-white tracking-wide">
            <RotateCcw />
            Practice Again
          </Button>
        </form>
      </div>
    </>
  );
};
export default FinalResult;