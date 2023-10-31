import { getCurrentUser } from '@/lib/current-user';
import { db } from '@/lib/db';
import { containsSpecialCharacters } from '@/utils/contains-special-characters';
import { hasDuplicates } from '@/utils/has-duplicates';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const take = searchParams.get('take');
  const skip = searchParams.get('skip');
  const authorId = searchParams.get('author');
  const tagId = searchParams.get('tag');

  console.log('author');

  try {
    if (tagId) {
      const threadsWithTag = await db.tag.findUnique({
        where: { id: tagId },
        select: {
          threads: {
            select: {
              id: true,
              title: true,
              content: true,
              tags: true,
              author: {
                select: {
                  id: true,
                  userId: true,
                  name: true,
                  imageUrl: true,
                  rank: true,
                  role: true,
                  plan: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: take ? parseInt(take) : 0,
            skip: skip ? parseInt(skip) : 0
          }
        }
      });

      return NextResponse.json(threadsWithTag?.threads);
    } else if (authorId) {
      const threadsFromAuthor = await db.thread.findMany({
        where: { authorId },
        select: {
          id: true,
          title: true,
          content: true,
          tags: true,
          author: {
            select: {
              id: true,
              userId: true,
              name: true,
              imageUrl: true,
              rank: true,
              role: true,
              plan: true
            }
          },
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: take ? parseInt(take) : 0,
        skip: skip ? parseInt(skip) : 0
      });

      return NextResponse.json(threadsFromAuthor);
    } else {
      const threads = await db.thread.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          tags: true,
          author: {
            select: {
              id: true,
              userId: true,
              name: true,
              imageUrl: true,
              rank: true,
              role: true,
              plan: true
            }
          },
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: take ? parseInt(take) : 0,
        skip: skip ? parseInt(skip) : 0
      });

      return NextResponse.json(threads);
    }
  } catch (err) {
    console.log('[THREADS_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, tags } = await req.json();
    const currentUser = await getCurrentUser();

    let specialCharacters = false;
    let brokeMax = false;

    for (const element of tags) {
      if (containsSpecialCharacters(element)) specialCharacters = true;
      if (element.length >= 20) brokeMax = true;
    }

    if (!currentUser) return new NextResponse('Unauthorized', { status: 401 });
    if (title.length === 0) return new NextResponse('Title required', { status: 400 });
    if (title.length >= 100) return new NextResponse('Title too long', { status: 400 });
    if (content.length >= 1000) return new NextResponse('Content too long', { status: 400 });

    if (tags.length > 5) return new NextResponse('You can only add up to 5 tags', { status: 400 });
    else if (brokeMax) return new NextResponse('Tag needs to be under 20 characters', { status: 400 });
    else if (hasDuplicates(tags)) return new NextResponse('You can not have duplicate tags', { status: 400 });
    else if (tags.includes('')) return new NextResponse('Empty tags are not allowed', { status: 400 });
    else if (specialCharacters) return new NextResponse('Special characters are not allowed', { status: 400 });

    const createdTags = await Promise.all(
      tags.map(async (tagName: string) => {
        return await db.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName }
        });
      })
    );

    const resolvedTags = await Promise.all(createdTags);

    const thread = await db.thread.create({
      data: {
        title,
        content,
        tags: {
          connect: resolvedTags.map(tag => ({ id: tag.id }))
        },
        authorId: currentUser.id
      }
    });

    return NextResponse.json(thread);
  } catch (err) {
    console.log('[THREADS_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
