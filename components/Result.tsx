type TimerProps={
    time: number,
    wpmScore: number,
    accuracy: number,
}

const Result = ({time, wpmScore, accuracy}: TimerProps) => {
  return (
    <div className="flex gap-4 h-fit w-fit">
      <div className="font-jakarta flex gap-2 text-neutral-300 text-xl">
        <span> Time </span>:<p>{`${time.toString()}s`}</p>{" "}
      </div>
      <div className="divide-y-2 divide-neutral-300"></div>
      <div className="font-jakarta flex gap-2 text-neutral-300 text-xl">
        WRM :<p>{`${wpmScore}`}</p>{" "}
      </div>
      <div className="divide-y-2 divide-neutral-300"></div>
      <div className="font-jakarta flex gap-2 text-neutral-300 text-xl">
        Accuracy :<p>{`${accuracy.toString()}%`}</p>{" "}
      </div>
    </div>
  );
};

export default Result;
