"use server";

import LeaderTable from "@/components/LeaderTable";

const LeaderBoard = () => {
  return (
    <section className=" bg-gradient-to-b from-neutral-900 to-black min-h-[100vh] w-[100%] flex  justify-center">
      <div className="w-[80%] lg:w-[60%] items-center mt-24">
        <div className="rounded-xl  w-full gap-3 border text-card-foreground  shadow bg-neutral-800/50 border-neutral-800 transition-all duration-300 hover:shadow-lg  flex items-center py-6 px-9">
          <LeaderTable />
        </div>
      </div>
    </section>
  );
};

export default LeaderBoard;
