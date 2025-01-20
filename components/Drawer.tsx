"use client";

import { Medal } from "lucide-react";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import type { WarriorType } from "@/app/multiplayer/war/[...slug]/page";

export type DrawerCardPropsType = {
  users: WarriorType[];
  timer: number;
};

export function DrawerCard({ users, timer }: DrawerCardPropsType) {
  const [searchUser, setSearchUser] = React.useState<string>("");

  return (
    <div className="relative flex flex-col items-center justify-center md:w-[80%] lg:w-[60%] p-4 bg-neutral-900/50 outline outline-1 outline-neutral-800 rounded-xl">
      {timer < 30 ? (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-sm text-center flex items-center justify-center font-inter text-neutral-200">
            Please wait for {30 - timer} seconds <br /> to view final result.
          </div>
        </div>
      ) : null}

      <div
        className={`w-full flex gap-4 flex-col ${timer < 30 ? "blur-sm" : ""}`}
      >
        <p className="text-sm font-medium text-neutral-400 text-center uppercase">
          Final Rank List
        </p>
        <Input
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Search by name..."
          className="outline focus:outline-neutral-600 text-neutral-200 outline-1 bg-neutral-900 border-none outline-neutral-800 w-[50%]"
        />
        <div className="pb-0 outline outline-[1px] outline-neutral-800 rounded-lg  w-full">
          <Table className="text-neutral-200">
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
            {users &&
              users
                ?.filter((item) => {
                  return item.name
                    .toLowerCase()
                    .includes(searchUser.toLowerCase());
                })
                .map((item, index) => (
                  <TableBody key={index}>
                    <TableRow className="border-neutral-300 hover:bg-neutral-900">
                      <TableCell className="flex gap-1 font-medium text-neutral-200">
                        <Medal
                          className={`${
                            index === 0
                              ? "text-yellow-500"
                              : index === 1
                              ? "text-[#C0C0C0]"
                              : index === 2
                              ? "text-[#CE8946]"
                              : "hidden"
                          }`}
                        />{" "}
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-neutral-200">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-neutral-200">
                        {item.wpm}
                      </TableCell>
                      <TableCell className="text-neutral-200">
                        {item.error}%
                      </TableCell>
                      <TableCell className="text-neutral-200">
                        {item.time} seconds
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
