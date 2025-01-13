import { WarriorType } from "@/app/multiplayer/war/[...slug]/page";
import { User } from "lucide-react";
import Image from "next/image";
type WarriorListProps = {
  warriorList: WarriorType[]
};

const WarriorList = ({warriorList}: WarriorListProps) => {
  return (
    <section className="w-[40%] mt-4 h-[85vh] bg-neutral-900/50 outline outline-1 rounded-xl outline-neutral-800 p-6">
      <div className="text-2xl  items-center text-neutral-200 flex jusitfy-center gap-2 font-semibold font-mono">
        <User className="size-7 text-sky-600" />
        <p>Warriors</p>
      </div>
      {
        <div className="mt-7 auto-y-scroll flex flex-col gap-5">
          {warriorList
            ? warriorList?.map((item, index) => (
                <div key={index} className="flex gap-2 text-neutral-200 font-mono">
                  <Image src={item.photoUrl} alt="User Profile" width={42} height={42} className="rounded-full outline outline-1 outline-blue-200"/>
                  <div>
                    <p className="font-semibold">{item?.name}</p>
                    <p className="text-sm text-neutral-200">{item?.email}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
      }
    </section>
  );
};

export default WarriorList;
