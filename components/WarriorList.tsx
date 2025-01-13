import { User } from "lucide-react";

const WarriorList = () => {
  return (
    <section className="w-[30%] mt-4 h-[85vh] bg-neutral-900/50 outline outline-1 rounded-xl outline-neutral-800 p-6">
      <div className="text-2xl  items-center text-neutral-200 flex jusitfy-center gap-2 font-semibold font-mono">
        <User className="size-7 text-sky-600" />
        <p>Warriors</p>
      </div>
    </section>
  );
};

export default WarriorList;
