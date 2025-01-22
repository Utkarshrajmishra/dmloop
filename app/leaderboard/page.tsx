"use server"

import LeaderTable from "@/components/LeaderTable"

const LeaderBoard=()=>{
  return(
        <section className=" bg-gradient-to-b from-neutral-900 to-black min-h-[100vh] w-[100%] flex justify-center">
      <div className="w-[80%] lg:w-[60%] items-center">
        
      <LeaderTable/>
      </div>
      </section>
  )
}

export default LeaderBoard