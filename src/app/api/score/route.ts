import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { calculateRisk } from "@/lib/score";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const it = await prisma.item.findUnique({ where: { id: params.id } });
  if (!it) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const newScore = calculateRisk({
    title: it.title,
    description: it.description,
    amount: it.amount,
    genre: it.genre,
    durationMin: it.durationMin,
    tags: it.tags,
  });

  const updated = await prisma.item.update({
    where: { id: params.id },
    data: { risk_score: newScore },
  });

  return NextResponse.json(updated);
}
