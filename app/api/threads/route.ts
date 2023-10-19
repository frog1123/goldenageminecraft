import { getCurrentUser } from '@/lib/current-user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const take = searchParams.get('take');
  const skip = searchParams.get('skip');

  try {
    const items = await db.thread.findMany({
      include: {
        author: {
          select: {
            id: true,
            userId: true,
            name: true,
            imageUrl: true,
            rank: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: take ? parseInt(take) : 0,
      skip: skip ? parseInt(skip) : 0
    });

    return NextResponse.json(items);
  } catch (err) {
    console.log('[THREADS_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) return new NextResponse('Unauthorized', { status: 401 });
    if (title.length >= 100) return new NextResponse('Title too long', { status: 400 });
    if (content.length >= 1000) return new NextResponse('Content too long', { status: 400 });

    const server = await db.thread.create({
      data: {
        title,
        content,
        authorId: currentUser.id
      }
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log('[THREADS_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
