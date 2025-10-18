import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { calculateRisk } from "@/lib/score";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await prisma.item.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const existing = await prisma.item.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const risk_score = calculateRisk({
    title: body.title ?? existing.title,
    description: body.description ?? existing.description,
    amount: body.amount ?? existing.amount,
    genre: body.genre ?? existing.genre,
    durationMin: body.durationMin ?? existing.durationMin,
    tags: body.tags ?? existing.tags,
  });

  const item = await prisma.item.update({
    where: { id: params.id },
    data: { ...body, risk_score },
  });

  return NextResponse.json(item);
}
