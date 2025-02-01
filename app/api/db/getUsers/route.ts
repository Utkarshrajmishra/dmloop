import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const scores = await prisma.score.groupBy({
      by: ["userId"],
      _avg: {
        averageAccuracy: true,
        averageWPM: true,
      },
      _sum: {
        totalTime: true,
      },
    });

    const userIds = scores.map((item) => item.userId);
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const result = scores.map((score) => {
      const user = users.find((user) => user.id === score.userId);
      return {
        userId: score.userId,
        averageWPM: score._avg.averageWPM || 0,
        averageAccuracy: score._avg.averageAccuracy || 0,
        totalTime: score._sum.totalTime || 0,
        name: user?.name || null,
        email: user?.email || null,
      };
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
