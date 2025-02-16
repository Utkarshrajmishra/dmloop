"use server";

import { War } from "@/components/War";
import { auth } from "@/auth";
import { Suspense } from "react";
import Loading from "@/app/(root)/loading";

const Page = async () => {
  const session = await auth();
  return (
    <Suspense fallback={<Loading />}>
      <War auth={session} />
    </Suspense>
  );
};

export default Page;
