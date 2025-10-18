import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { calculateRisk } from "@/lib/score";

export async function GET() {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const { title, description, amount, genre, durationMin, tags } = await req.json();

  const risk_score = calculateRisk({
    title,
    description,
    amount: Number(amount) || 0,
    genre,
    durationMin: Number(durationMin) || 0,
    tags: String(tags ?? ""),
  });

  const item = await prisma.item.create({
    data: {
      title,
      description,
      amount: Number(amount) || 0,
      genre,
      durationMin: Number(durationMin) || 0,
      tags: String(tags ?? ""),
      risk_score,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
