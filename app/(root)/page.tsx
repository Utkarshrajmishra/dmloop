import { Button } from "@/components/ui/button";
import { Keyboard, Swords } from "lucide-react";
export default function Home() {
  
  return (
    <main>
      <section className=" h-[100vh] relative bg-gradient-to-b from-slate-900 via-blue-900 to-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative flex-col flex items-center justify-center h-[100vh]">
          <div className="mx-auto font-jakarta mt-16 max-w-4xl text-center">
            <h1 className="text-4xl  font-bold tracking-tighter text-center text-white sm:text-5xl md:text-6xl lg:text-7xl font-jakarta leading-loose">
              Level Up Your Typing Skills <br /> with{" "}
              <span className="bg-gradient-to-b  from-sky-400 to-blue-900 inline-block text-transparent bg-clip-text">
                KeyboardWars
              </span>
            </h1>
            <p className="mt-6  md:px-16 text-lg leading-wide text-blue-200 font-jakarta">
              Practice typing, challenge friends, and track improvements with
              real-time stats in a sleek, minimalist interface.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-blue-800  outline outline-1 outline-white flex justify-center  font-jakarta text-white hover:bg-blue-700"
              >
                Start Typing <Keyboard className="size-10" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white   bg-black  "
              >
                Start War <Swords />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
