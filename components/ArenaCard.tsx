"use client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Selector } from "./select";
import { Input } from "./ui/input";
import { Loader } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { handleForm } from "@/actions/formAction";
import { useRouter } from "next/navigation";
const options = ["20 words", "30 words", "50 words"];
const modes = ["Words War"];

type ArenaCardProps = {
  session:any,
  title: string;
  showSelectors: boolean;
  buttonText: string;
};

const ArenaCard = ({
  session,
  title,
  showSelectors = false,
  buttonText,
}: ArenaCardProps) => {
  
  const router = useRouter();
  const {toast}=useToast()
  const [loading,setLoading]=useState(false)
 
  const [state, action] = useActionState(
    async (prevState:any, formData:any) =>
      await handleForm(prevState, formData, session),
    {
      code: "",
      mode: "",
      error: { code: [], mode: [] },
    }
  );

   useEffect(() => {
     if (!session || (state.error.code!=null && state.error.code[0]==="Login is required.")) {
       toast({
         variant: "destructive",
         className: "bg-neutral-950 text-white border border-neutral-700",
         title: "Login is required!",
         description: "Login is required to perform this action.",
       });
     }
     if(state.error.code!=null && state.error.code[0]==="Success"){
      setLoading(true)
        router.push(`multiplayer/war/${state.code}`)
     }
   }, [session, state?.error?.code]);


  return (
    <div className="rounded-xl w-[550px] gap-4 border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg flex flex-col p-7">
      <p className="text-neutral-200 font-mono text-xl font-semibold">
        {title}
      </p>
      <form action={action} className="flex flex-col gap-4">
        <div>
          <Input
            type="text"
            id="code"
            name="code"
            placeholder="Room Code"
            className="flex h-9 font-mono w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
          />
          {state?.error?.code &&
            state?.error?.code[0] != "Login is required." &&
            state?.error?.code[0] != "Success" && (
              <p className="text-[0.89rem] text-red-500">{state.error.code}</p>
            )}
        </div>
        <div className={`flex gap-4 ${showSelectors ? "" : "hidden"}`}>
          <Selector title="War Type" options={modes} />
          <Selector
            id="mode"
            name="mode"
            title="Modes Options"
            options={options}
          />
        </div>
        <Button
          type="submit"
          className={
            "text-mono bg-sky-700 hover:bg-sky-800 font-mono text-neutral-200  text-[0.9rem]"
          }
        >
          {loading? (<div className="animate-spin">
              <Loader/>
          </div>) :buttonText}
        </Button>
      </form>
    </div>
  );
};

export default ArenaCard;
