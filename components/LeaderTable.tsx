"use client";
import useSWR from "swr";
import { Crown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  averageWPM: number;
  averageAccuracy: number;
  totalTime: number;
};

const fetcher = async (url: string): Promise<User[]> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const LeaderTable = () => {
  const [timer, setTimer]=useState(30)
  const [search, setSearch]=useState('')
  const {
    data: users,
    error,
    isValidating,
  } = useSWR<User[]>("/api/db/getUsers", fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  });

  // useEffect(()=>{
  //     if(isValidating || timer===0) setTimer(30)

  //   const id=setInterval(()=>{
  //     if(timer===0) return;
  //     setTimer(prev=> prev-1)
  //   },1000)

  //   return ()=> clearInterval(id)
  // },[users])


  return (
    <div className="w-full font-inter max-h-[70vh] overflow-auto flex flex-col items-center  gap-5">
      <div className="flex flex-col items-center">
        <p className="text-zinc-200 text-center flex gap-1 font-semibold text-xl">
          <Crown className="text-yellow-400" />
          Leaderboard
        </p>
        <p className="text-neutral-400 text-sm mt-1">
          This page refreshes in every 30 seconds 
        </p>
      </div>
      <Input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        type="text"
        placeholder="Search by name..."
        className="flex h-9 font-inter w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
      />
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
            users.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
              <TableRow
                key={item.id || index}
                className="border-neutral-300 hover:bg-neutral-900"
              >
                <TableCell className="text-neutral-200">{index + 1}</TableCell>
                <TableCell className="text-neutral-200">{item.name}</TableCell>
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
