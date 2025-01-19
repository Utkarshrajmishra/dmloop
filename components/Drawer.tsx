"use client";

import { Medal, Trophy } from "lucide-react";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { WarriorType } from "@/app/multiplayer/war/[...slug]/page";

export type DrawerCardPropsType = {
  users: WarriorType[];
};

export function DrawerCard({ users }: DrawerCardPropsType) {
  const [searchUser,setSearchUser]=React.useState<string>('')
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center justify-center gap-1">View Rank List <Trophy/></Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black border-neutral-800 text-neutral-200 font-inter pb-4 ">
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle className="hidden font-medium text-neutral-400 uppercase">
              Rank List
            </DrawerTitle>
            <DrawerDescription className="hidden">
              Set your daily activity goal.
            </DrawerDescription>
          </DrawerHeader>
          <Input
            type="text"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search by name..."
            className="outline outline-1 bg-neutral-900 border-none outline-neutral-800 w-[50%]"
          />
          <div className=" pb-0 outline outline-[1px] outline-neutral-800 rounded-lg mt-4">
            <Table className=" text-neutral-200 ">
              <TableHeader>
                <TableRow className="border-b border-neutral-800 rounded-xl bg-neutral-900">
                  <TableHead className="text-sm font-medium text-neutral-200 uppercase ">
                    Rank
                  </TableHead>
                  <TableHead className="text-sm font-medium text-neutral-200 uppercase ">
                    Name
                  </TableHead>
                  <TableHead className="text-sm font-medium text-neutral-200 uppercase">
                    WPM
                  </TableHead>
                  <TableHead className="text-sm font-medium text-neutral-200 uppercase">
                    Accuracy
                  </TableHead>
                  <TableHead className="text-sm font-medium text-neutral-200 uppercase ">
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              {users &&
                users
                  ?.filter((item) =>{
                    return item.name.toLowerCase().includes(searchUser.toLowerCase())}
                  )
                  .map((item, index) => (
                    <TableBody key={index}>
                      <TableRow className=" border-neutral-300 hover:bg-neutral-900">
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
                        <TableCell className="text-neutral-200 ">
                          {item.name}
                        </TableCell>
                        <TableCell className="text-neutral-200  ">
                          {item.wpm}
                        </TableCell>
                        <TableCell className="text-neutral-200  ">
                          {item.error}%
                        </TableCell>
                        <TableCell className="text-neutral-200 ">
                          {item.time} seconds
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
            </Table>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
