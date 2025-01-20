import { WPMType } from "@/hooks/useWPM";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";

export type ChartProps = {
  wpmHistory: WPMType[];
};

const Chart = ({ wpmHistory }: ChartProps) => {
  const minWPM = Math.max(
    0,
    Math.min(...wpmHistory.map((point) => point.wpm)) - 10
  );
  const maxWPM = Math.max(...wpmHistory.map((point) => point.wpm)) + 10;

    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        return (
          <div
            style={{
              backgroundColor: "#171717",
              borderColor: "#404040",
              color: "#ffffff",
              fontSize: "0.8rem",
              borderRadius: "10px",
              padding: "10px",
              border: "1px solid #404040",
              height: "50px",
            }}
          >
            <p>{`Time: ${payload[0].payload.time} sec`}</p>
            <p>{`WPM: ${payload[0].value}`}</p>
          </div>
        );
      }
      return null;
    };

  const times = [...new Set(wpmHistory.map((point) => point.time))].filter(
    (time) => time % 3 === 0
  );

  return (
    <div className="h-[350px] md:w-[80%] lg:w-[60%] rounded-xl bg-neutral-900/50 border-neutral-800 border p-2  items-center justify-center  text-[1rem] text-neutral-400">
      <p className="text-sm font-medium text-neutral-400 text-center uppercase">
      Your  Performace Analysis
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={wpmHistory}
          margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="2 2" stroke="#404040" />
          <XAxis
            dataKey="time" // Ensure this key matches the key for time in your data
            tick={{ fontSize: 12, fill: "#ccc" }}
            ticks={times} // Use the unique list of times for ticks
            interval={0}
            tickFormatter={(value) => value} // Use value as is
          />
          <YAxis
            domain={[minWPM, maxWPM]}
            tick={{ fontSize: 12, fill: "#ccc" }}
          />
          <Line
            type="monotone"
            dataKey="wpm"
            stroke="#10b981"
            dot={false}
            strokeWidth="2.5"
            activeDot={{ r: 1 }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#ccc", strokeWidth: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
