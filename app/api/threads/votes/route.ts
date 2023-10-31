import { getCurrentUser } from '@/lib/current-user';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = await req.json();
  const { threadId, type } = res;

  const a = auth();

  const currentUser = await getCurrentUser();

  if (!a.sessionId || !a.userId) return new NextResponse('Unauthorized', { status: 401 });
  if (!threadId) return new NextResponse('Bad request', { status: 400 });
  if (!currentUser) return new NextResponse('Bad request', { status: 400 });

  const existingThreadUpvote = await db.threadUpvote.findUnique({
    where: {
      threadId_authorId: {
        threadId,
        authorId: currentUser.id
      }
    }
  });

  if (existingThreadUpvote) return new NextResponse('Thread already upvoted', { status: 400 });

  const existingThreadDownvote = await db.threadDownVote.findUnique({
    where: {
      threadId_authorId: {
        threadId,
        authorId: currentUser.id
      }
    }
  });

  if (existingThreadDownvote) return new NextResponse('Thread already downvoted', { status: 400 });

  if (type === 'u') {
    await db.threadUpvote.create({
      data: {
        threadId,
        authorId: currentUser.id
      }
    });
  } else if (type === 'd') {
    await db.threadDownVote.create({
      data: {
        threadId,
        authorId: currentUser.id
      }
    });
  }

  return new NextResponse('success');
}
