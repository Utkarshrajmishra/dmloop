import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("userId");
    
    if(!id){
        return new Response(JSON.stringify({ error: "User ID is reqiured" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
    }

    const score = await prisma.score.findMany({
      where: {
        userId: {
          equals: id,
        },
      },
    });

    return new Response(JSON.stringify(score), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
