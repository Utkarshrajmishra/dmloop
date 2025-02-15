"use server";

import { War } from "@/components/War";
import { auth } from "@/auth";
import { Suspense } from "react";

const Page = async () => {
  const session = await auth();
  return (
    <Suspense
      fallback={
        <p>Loading</p>
      }
    >
      <War auth={session} />
    </Suspense>
  );
};

export default Page;
