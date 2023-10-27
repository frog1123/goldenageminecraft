import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

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
