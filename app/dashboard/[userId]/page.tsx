import { auth } from "@/auth";
import LeaderTable from "@/components/LeaderTable";
import { calculateAverage } from "@/lib/utils";
import { Gauge, Hourglass, Target } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export type dataAverageTypes = {
  sumAccuracy: number;
  sumWPM:number;
};

export type UserDashboardTypes={
  id:string,
  averageAccuracy:number,
  averageWPM:number,
  date:string,
  totalTime:number,
  userid:string,
}

const fetchData=async(userId: string)=>{
    try{
  const response=await fetch(`http://localhost:3000/api/db/getUser?userId=${userId}`,{
      method:'GET',
      cache:'no-store'
    })
    if(!response.ok){
      throw new Error('Failed to fetch')
    }
    return response.json()
    }
    catch(error){
      console.log(error)
      return null
    }
}

const Dashboard = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const session = await auth();
  if(!session?.id)return redirect('/')
  const data: UserDashboardTypes[]=await fetchData(session?.id)
 const averageData: dataAverageTypes=calculateAverage(data)
 console.log(data)
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-black h-[100vh] w-[100%] flex items-center justify-center font-mono">
      <div className="flex flex-col gap-6 mt-14 pb-6">
        <div className="mt-5 flex items-center gap-6 rounded-full">
          <Image
            src={session?.user?.image || "./vercel.svg"}
            alt="User Image"
            width={75}
            height={75}
            className="rounded-full outline outline-1 outline-blue-400"
          />
          <div className="flex flex-col gap-1">
            <p className="text-zinc-200 text-3xl font-semibold">
              {session?.user?.name}
            </p>
            <p className="text-sm text-neutral-400">{session?.user?.email}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="rounded-xl  w-[300px] gap-3 border text-card-foreground  shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50 flex items-center py-6 px-9">
            <Target className="size-8 text-purple-500" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-400 uppercase">
               average wpm
              </p>
              <p className="font-bold text-2xl text-neutral-200">{averageData.sumWPM}</p>
            </div>
          </div>
          <div className="rounded-xl  w-[300px] gap-3 border text-card-foreground  shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50 flex items-center py-6 px-9">
            <Hourglass className="size-8 text-sky-500" />

            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-400 uppercase">
               average ACCURACY
              </p>
              <p className="font-bold text-2xl text-neutral-200">{averageData.sumAccuracy}%</p>
            </div>
          </div>
          <div className="rounded-xl  w-[300px] gap-3 border text-card-foreground  shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50 flex items-center py-6 px-9">
            <Gauge className="size-8 text-emerald-500" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-400 uppercase">
              total time
              </p>
              <p className="font-bold text-2xl text-neutral-200">{data[data.length-1].totalTime} secs</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl  w-full gap-3 border text-card-foreground  shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50 flex items-center py-6 px-9">
        <LeaderTable/>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
