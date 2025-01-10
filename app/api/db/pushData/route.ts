import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { calculateWPMAverage } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponse){
    if(req.method=='POST'){
        try{
        const session = await auth()
        if(session && session.user && session.id){
            const {wpmHistory, accuracy, time}=req.body;
            const avgWPM=calculateWPMAverage(wpmHistory)
            await prisma.score.create({
                data:{
                    averageAccuracy: accuracy,
                    averageWPM: avgWPM,
                    totalTime:time,
                    userId:session?.id
                }
            })

            res.status(200).json({message: "Data saved successfully"})
        }
        else res.status(401).json({message: " Unauthorized"})
    }
    
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}
else {
    res.status(405).json({method: "Method not allowed"})
}
}