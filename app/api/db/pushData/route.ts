import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { calculateWPMAverage } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (session && session.user && session.id) {
      const body = await req.json();
      const { wpmHistory, accuracy, time } = body;
      const avgWPM = calculateWPMAverage(wpmHistory);
      await prisma.score.create({
        data: {
          averageAccuracy: accuracy,
          averageWPM: avgWPM,
          totalTime: time,
          userId: session?.id,
        },
      });

      return NextResponse.json(
        { message: "Data saved successfully" },
        { status: 200 }
      );
    } else
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
