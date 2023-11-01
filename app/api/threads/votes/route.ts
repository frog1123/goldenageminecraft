import { getCurrentUser } from '@/lib/current-user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = await req.json();
  const { threadId, type } = res;

  const currentUser = await getCurrentUser();

  if (!currentUser) return new NextResponse('Unauthorized', { status: 401 });
  if (!threadId) return new NextResponse('Bad request', { status: 400 });

  const existingThreadUpvote = await db.threadUpvote.findUnique({
    where: {
      threadId_authorId: {
        threadId,
        authorId: currentUser.id
      }
    }
  });

  const existingThreadDownvote = await db.threadDownVote.findUnique({
    where: {
      threadId_authorId: {
        threadId,
        authorId: currentUser.id
      }
    }
  });

  if (type === 'u') {
    if (existingThreadUpvote) return new NextResponse('Thread already upvoted', { status: 400 });

    if (existingThreadDownvote)
      await db.threadDownVote.delete({
        where: {
          threadId_authorId: {
            threadId,
            authorId: currentUser.id
          }
        }
      });

    await db.threadUpvote.create({
      data: {
        threadId,
        authorId: currentUser.id
      }
    });
  } else if (type === 'd') {
    if (existingThreadDownvote) return new NextResponse('Thread already downvoted', { status: 400 });

    if (existingThreadUpvote)
      await db.threadUpvote.delete({
        where: {
          threadId_authorId: {
            threadId,
            authorId: currentUser.id
          }
        }
      });

    await db.threadDownVote.create({
      data: {
        threadId,
        authorId: currentUser.id
      }
    });
  }

  return new NextResponse('success');
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const threadId = searchParams.get('t');
  const type = searchParams.get('ty');

  const currentUser = await getCurrentUser();
  if (!currentUser) return new NextResponse('Unauthorized', { status: 401 });

  if (!threadId) return new NextResponse('Bad request', { status: 400 });

  if (type === 'u') {
    try {
      await db.threadUpvote.delete({
        where: {
          threadId_authorId: {
            threadId,
            authorId: currentUser.id
          }
        }
      });
    } catch (err) {
      console.log('[VOTES_DELETE]', err);
      return new NextResponse('Internal Error', { status: 500 });
    }
  }

  if (type === 'd') {
    try {
      await db.threadDownVote.delete({
        where: {
          threadId_authorId: {
            threadId,
            authorId: currentUser.id
          }
        }
      });
    } catch (err) {
      console.log('[VOTES_DELETE]', err);
      return new NextResponse('Internal Error', { status: 500 });
    }
  }
}
