import { Crown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";


type User = {
  id: string;
  name: string;
  email: string;
};


const LeaderTable = () => {
  
  return (
    <div className="w-full font-inter max-h-[70vh] overflow-auto flex flex-col items-center  gap-5">
      <div className="flex flex-col items-center">
        <p className="text-zinc-200 text-center flex gap-1 font-semibold text-xl">
          <Crown className="text-yellow-400" />
          Leaderboard
        </p>
       
      </div>
     
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-800 rounded-xl bg-neutral-900 hover:bg-neutral-900">
            <TableHead className="text-sm font-medium text-neutral-200 uppercase">
              Rank
            </TableHead>
            <TableHead className="text-sm font-medium text-neutral-200 uppercase">
              Name
            </TableHead>
            <TableHead className="text-sm font-medium text-neutral-200 uppercase">
              WPM
            </TableHead>
            <TableHead className="text-sm font-medium text-neutral-200 uppercase">
              Accuracy
            </TableHead>
            <TableHead className="text-sm font-medium text-neutral-200 uppercase">
              Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <TableRow
                  key={item.id || index}
                  className="border-neutral-300 hover:bg-neutral-900"
                >
                  <TableCell className="text-neutral-200">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-neutral-200">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-neutral-200">
                    {Math.ceil(item.averageWPM)}
                  </TableCell>
                  <TableCell className="text-neutral-200">
                    {parseFloat(item.averageAccuracy.toFixed(2))}%
                  </TableCell>
                  <TableCell className="text-neutral-200">
                    {item.totalTime} seconds
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderTable;
