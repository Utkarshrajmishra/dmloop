"use client";

import { Button } from "./ui/button";
import { Selector } from "./select";
import { Input } from "./ui/input";
import { useActionState } from "react";
import { handleForm } from "@/actions/formAction";

const options = ["20 words", "30 words", "50 words"];
const modes = ["Words War"];

type ArenaCardProps = {
  title: string;
  showSelectors: boolean;
  buttonText: string;
  session: string | undefined;
};

const ArenaCard = ({
  session,
  title,
  showSelectors = false,
  buttonText,
}: ArenaCardProps) => {
  const [state, action] = useActionState(handleForm, {
    code: "",
    mode: "",
    error: { code: [], mode: [] },
  });

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
          {state?.error?.code && <p className="text-[0.89rem] text-red-500">{state.error.code}</p>}
        </div>
          <div className={`flex gap-4 ${showSelectors?'':'hidden'}`}>
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
          {buttonText}
        </Button>
      </form>
    </div>
  );
};

export default ArenaCard;
