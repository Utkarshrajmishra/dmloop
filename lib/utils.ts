import { WPMType } from "@/hooks/useWPM";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const countErrors=(actual:string, expected:string)=>{
  const expectedCharacter=expected.split("");

  return expectedCharacter.reduce((error, expectedChar, index)=>{
    const acutalChar=actual[index];
    if(acutalChar!==expectedChar){
      error++;
      console.log(error)
    }
    return error
  },0)
}

export const calculateAccuracyPercentage=(errors:number, total:number)=>{
  if(total>0){
    const correct=total-errors;
    const accuracy=(correct/total)*100;
    return parseFloat(accuracy.toFixed(2));
  }
  return 0;
}

export const calculateWPMAverage=(wpmHistory: WPMType[])=>{
    const totalWPM=wpmHistory.reduce((sum,currentWPM)=> sum+currentWPM.wpm,0)
    return Math.round(totalWPM/wpmHistory.length)
}

