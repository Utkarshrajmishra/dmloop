import { dataAverageTypes, UserDashboardTypes } from "@/app/dashboard/[userId]/page";
import { User } from "@/components/LeaderTable";
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
    const scoreA=(a.error*2)+(a.wpm*1.5)-(a.time*0.1);
    const scoreB = (b.error * 2) +( b.wpm * 1.5) - (b.time * 0.1);
    return scoreB-scoreA;

  })
}

export const sortLeaders = (users: User[]) => {
  return users.sort((a, b) => {
    const scoreA =
      a.averageAccuracy * 2 + a.averageWPM * 1.5 - a.totalTime* 0.1;
    const scoreB =
      b.averageAccuracy * 2 + b.averageWPM * 1.5 - b.totalTime * 0.01;
    return scoreB - scoreA;
  }).slice(0,5);
};

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