import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  const a = auth();

  if (!a.sessionId || !a.userId) return new NextResponse('Unauthorized', { status: 401 });
  if (!userId) return new NextResponse('Bad request', { status: 400 });

  const userWithId = await db.user.findUnique({
    where: {
      userId
    },
    select: {
      id: true
    }
  });

  return NextResponse.json(userWithId);
}
