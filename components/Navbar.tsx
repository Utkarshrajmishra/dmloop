"use client"

import React from "react";
import { Zap, Keyboard, Trophy, Swords, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
const Links = [
  {
    id: 1,
    icon: <Keyboard />,
    name: "Practise",
  },
  {
    id: 2,
    icon: <Swords />,
    name: "Multiplayer",
  },
  {
    id: 3,
    icon: <Trophy />,
    name: "Leardboard",
  },
];

const Navbar = () => {
const router=useRouter()

  return (
    <nav className="absolute mt-2 font-jakarta top-0 left-0 right-0 z-10">
      <div className="flex py-4 justify-between items-center gap-2 px-16">
        <Link href="/" className="cursor-pointer flex items-center gap-2">
          <div className="h-8 w-8 shadow-xl shadow-blue-500 rounded-lg outline outline-1 outline-neutral-200  bg-black flex items-center justify-center font-bold">
            <Zap className="text-white p-1" />
          </div>

          <p className="text-white text-xl font-semibold ">
            KeyboardWars
          </p>
        </Link>
        <div className="flex gap-10">
          {Links.map((link) => (
            <Link
              className="flex hover:text-blue-500 gap-2 text-sm text-blue-200 items-center"
              key={link.id}
              href="/auth"
            >
              {link.icon}
              <p>{link.name}</p>
            </Link>
          ))}

          <Button onClick={()=>router.push('/auth')} className="bg-black flex items-center gap-2 outline outline-1 outline-blue-200">
            Login <User />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
