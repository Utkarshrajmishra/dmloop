import React from "react";
import { Zap, Keyboard, Trophy, Swords, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth, signIn } from "@/auth";
import Profile from "./Profile";
const Links = [
  {
    id: 1,
    icon: <Keyboard />,
    name: "Practice",
    path: '/practice'
  },
  {
    id: 2,
    icon: <Swords />,
    name: "Multiplayer War",
    path:"/multiplayer"
  },
  {
    id: 3,
    icon: <Trophy />,
    name: "Leaderboard",
    path:"/leaderboard"
  },
];

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="absolute  font-jakarta top-0 left-0 right-0 z-10">
      <div className="flex py-4 justify-between items-center gap-2 px-16">
        <Link href="/" className="cursor-pointer flex items-center gap-2">
          <div className="h-8 w-8 shadow-xl shadow-blue-500 rounded-lg outline outline-1 outline-neutral-200  bg-black flex items-center justify-center font-bold">
            <Zap className="text-white p-1" />
          </div>

          <p className="text-white text-xl font-semibold ">KeyboardWars</p>
        </Link>
        <div className="flex gap-10">
          {Links.map((link) => (
            <Link
              className="flex hover:text-blue-200 gap-2 text-sm text-white items-center"
              key={link.id}
              href={link.path}
            >
              {link.icon}
              <p>{link.name}</p>
            </Link>
          ))}
          {session && session?.user ? (
            <Profile session={session}/>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button
                type="submit"
                className="bg-black flex items-center gap-2 outline outline-1 outline-blue-200"
              >
                Login <User />
              </Button>
            </form>
          )}
        </div>
      </div>
      <div className="divide-x-2 bg-white"></div>
    </nav>
  );
};

export default Navbar;
