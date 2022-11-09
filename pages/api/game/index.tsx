import { getSession } from 'next-auth/react';
import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { score } = req.body;

  const session = await getSession({ req });
  const result = await prisma.game.create({
    data: {
      score: score,
      player: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
