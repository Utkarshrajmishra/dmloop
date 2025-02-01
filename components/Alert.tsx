"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { redirect } from "next/navigation";

type AlertProps={
    state: boolean,
    setState: (state: boolean)=>void;
}

export function Alert({state, setState}: AlertProps) {
  const handleClick=()=>{
    redirect('/')
  }
  return (
    <AlertDialog open={state}>
      <AlertDialogContent className="bg-neutral-950 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Login is required!</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            This action requires authentication. Please make sure 
            you are logined before performing this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
