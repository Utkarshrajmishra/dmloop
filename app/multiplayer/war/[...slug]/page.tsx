"use server";

import { War } from "@/components/War";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();
  return <War auth={session} />;
};

export default Page;
