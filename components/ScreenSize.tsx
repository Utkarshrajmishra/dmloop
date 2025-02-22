"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";

export function ScreenSizeDialog() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 850);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 850);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <AlertDialog  open={isSmallScreen}>
        <AlertDialogContent className="w-[95%] bg-neutral-950 border border-neutral-800 rounded-md" >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-200">Please open on a larger screen</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              The screen size is too small for the application to run. Please make
              sure to open it on a larger screen.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
  );
}
