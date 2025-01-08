import { User, LogOut, Mail, Database } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {signOut } from "@/auth";

type session = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string | null;
};

const Profile = async({ session }: { session: session }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="rounded-full shadow-xl shadow-blue-800 outline outline-1 outline-blue-200">
            <Image
              src={session?.user?.image || "./vercel.svg"}
              alt="Profile"
              width={36}
              height={35}
              className="rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50 font-inter bg-neutral-900 text-white outline outline-1 outline-black ">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              {session.user?.name}
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              {session.user?.email}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Database className="mr-2 h-4 w-4" />
              <p>Dashboard</p>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={async()=>{
                "use server"
                await signOut();
                console.log("Hello")
              }}>
                <button type="submit" className="flex gap-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Profile;
