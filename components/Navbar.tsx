import React from "react";
import { Zap, Keyboard, Trophy, Swords, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Links = [
  {
    id: 1,
    icon: <Keyboard />,
    name: "Type",
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
  return (
    <nav className="absolute mt-2 font-jakarta top-0 left-0 right-0 z-10">
      <div className="flex py-4 justify-between items-center gap-2 px-16">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg outline outline-1 outline-neutral-200  bg-black flex items-center justify-center font-bold">
            <Zap className="text-white p-1" />
          </div>

         <p className="text-xl font-semibold text-blue-200">KeyboardWars</p> 
        </div>
        <div className="flex gap-10">
          {Links.map((link) => (
            <Link
              className="flex gap-2 text-sm text-blue-200 items-center"
              key={link.id}
              href="/"
            >
              {link.icon}
              <p>{link.name}</p>
            </Link>
          ))}
        
        
          <Button className="bg-black flex items-center gap-2 outline outline-1 outline-blue-200">
            Login <User/>
          </Button>
        </div> 
      </div>
    </nav>
  );
};

export default Navbar;
