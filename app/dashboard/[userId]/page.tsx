import { auth } from "@/auth";
import LeaderTable from "@/components/LeaderTable";
import { Gauge, Hourglass, Target } from "lucide-react";
import Image from "next/image";

const Dashboard = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const session = await auth();
  const { userId } = await params;
  return (
    <section className="relative bg-gradient-to-b from-neutral-900 to-black min-h-[100vh] min-w-[100%] flex items-center justify-center font-mono">
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
              <p className="font-bold text-2xl text-neutral-200">10%</p>
            </div>
          </div>
          <div className="rounded-xl  w-[300px] gap-3 border text-card-foreground  shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50 flex items-center py-6 px-9">
            <Hourglass className="size-8 text-sky-500" />

            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-400 uppercase">
               average ACCURACY
              </p>
              <p className="font-bold text-2xl text-neutral-200">10%</p>
            </div>
          </div>
          <div className="rounded-xl  w-[300px] gap-3 border text-card-foreground  shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50 flex items-center py-6 px-9">
            <Gauge className="size-8 text-emerald-500" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-400 uppercase">
              total time
              </p>
              <p className="font-bold text-2xl text-neutral-200">10%</p>
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
