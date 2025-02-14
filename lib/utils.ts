import { dataAverageTypes, UserDashboardTypes } from "@/app/dashboard/[userId]/page";
import { WarriorType } from "@/components/War";
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


export const sortUser=(users: WarriorType[])=>{
  return users.sort((a,b)=>{
    if(a.wpm ===0 && b.wpm!==0) return -1;
    if(b.wpm===0 && a.wpm!==0) return -1;
    if(b.wpm!==a.wpm) return b.wpm-a.wpm;
    if(a.error!==b.error) return a.error -b.error;
    return a.time-b.time;
  })
}

export const calculateAverage=(data:UserDashboardTypes[]): dataAverageTypes=>{
  if(data.length==0) return {sumAccuracy:0,sumWPM:0};
  let sumWPM=0, sumAccuracy=0;
  for(let i=0;i<data.length;i++){
    sumWPM+=data[i].averageWPM
    sumAccuracy+=data[i].averageAccuracy
  }
  sumAccuracy=parseFloat((sumAccuracy/data.length).toFixed(2))
  sumWPM=Math.ceil(sumWPM/data.length)
  return {sumAccuracy, sumWPM}
}