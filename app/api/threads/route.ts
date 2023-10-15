import { getCurrentUser } from '@/lib/current-user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.thread.create({
      data: {
        title,
        content,
        authorId: currentUser.id
      }
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log('[SERVER_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
