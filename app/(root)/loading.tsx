import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <section className=" h-[100vh] relative bg-gradient-to-b from-neutral-900 to-black">
      <div className="w-full h-full items-center justify-center">
        <div className="animate-spin text-white">
          <LoaderCircle className="size-5"/>
        </div>
      </div>
    </section>
  );
};

export default Loading
