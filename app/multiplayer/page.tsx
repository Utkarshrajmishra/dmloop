import { Selector } from "@/components/select";
import { Input } from "@/components/ui/input";

const options = ["20 words", "30 words", "50 words"];

const modes = ["Text"];

const Multiplayer = () => {
  return (
    <section className=" bg-gradient-to-b from-neutral-900 to-black min-h-[100vh] w-[100%] flex justify-center">
      <div className="w-[80%] lg:w-[70%] items-center">
        <div className="mt-20">
          <p className="text-neutral-200 text-3xl font-mono font-semibold">
            Step into the Arena
          </p>
          <div className="flex gap-4">
            <div className="rounded-xl  w-[550px] gap-3 border text-card-foreground  shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg flex  flex-col p-7">
              <p className="text-neutral-200 font-mono text-xl font-semibold ">
                Create Arena
              </p>
              <Input
                type="text"
                placeholder="Room Code"
                className="flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
              />
              <div className="flex gap-4">
                <Selector title="War Type" options={modes} />

                <Selector title="Modes Options" options={options} />
              </div>
            </div>
            <div className="rounded-xl  w-[550px] gap-3 border text-card-foreground  shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg flex items-center py-6 px-9"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Multiplayer;
