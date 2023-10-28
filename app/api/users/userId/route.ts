import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const a = auth();

  if (!a.sessionId || !a.userId) return new NextResponse('Unauthorized', { status: 401 });
  if (!id) return new NextResponse('Bad request', { status: 400 });

  const userWithUserId = await db.user.findUnique({
    where: {
      id
    },
    select: {
      userId: true
    }
  });

  return NextResponse.json(userWithUserId);
}
