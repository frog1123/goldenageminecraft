import { getCurrentUser } from '@/lib/current-user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    const currentUser = await getCurrentUser();

    console.log(currentUser);

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (title.length >= 100) {
      return new NextResponse('Title too long', { status: 400 });
    }

    if (content.length >= 1000) {
      return new NextResponse('Content too long', { status: 400 });
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
