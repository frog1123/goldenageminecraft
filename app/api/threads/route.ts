import { getServerCurrentUser } from "@/lib/current-user";
import { getServerCurrentUserId } from "@/lib/current-user-id";
import { db } from "@/lib/db";
import { ThreadType, ThreadTypeSignedIn, ThreadTypeWithVotes, ThreadTypeWithoutVotes } from "@/types/threads";
import { containsSpecialCharacters } from "@/utils/contains-special-characters";
import { hasDuplicates } from "@/utils/has-duplicates";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const _take = searchParams.get("tk");
  const _skip = searchParams.get("sk");
  const authorId = searchParams.get("a");
  const tagId = searchParams.get("t");

  const take = _take ? parseInt(_take) : null;
  const skip = _skip ? parseInt(_skip) : null;

  // dont use !
  if (take === null || skip === null) return new NextResponse("Bad request", { status: 400 });
  if (take >= 20) return new NextResponse("tk too large", { status: 400 });

  const userId = await getServerCurrentUserId();

  if (userId) {
    try {
      if (tagId) {
        const threadsWithTag: { threads: ThreadTypeWithoutVotes[] } | null = await db.tag.findUnique({
          where: { id: tagId },
          select: {
            threads: {
              select: {
                id: true,
                title: true,
                content: true,
                tags: {
                  select: {
                    id: true,
                    name: true
                  }
                },
                author: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    rank: true,
                    role: true,
                    plan: true
                  }
                },
                votes: {
                  where: {
                    authorId: userId
                  }
                },
                createdAt: true
              },
              orderBy: {
                createdAt: "desc"
              },
              take,
              skip
            }
          }
        });

        const threadsWithTagsWithVotes: { threads: ThreadTypeWithVotes[] } | null = {
          threads: await Promise.all(
            (threadsWithTag?.threads || []).map(async thread => {
              const upvotesCount = await db.vote.count({
                where: {
                  threadId: thread.id,
                  type: "UPVOTE"
                }
              });

              const downvotesCount = await db.vote.count({
                where: {
                  threadId: thread.id,
                  type: "DOWNVOTE"
                }
              });

              return {
                ...thread,
                count: {
                  upvotes: upvotesCount,
                  downvotes: downvotesCount
                }
              };
            })
          )
        };

        return NextResponse.json(threadsWithTagsWithVotes?.threads);
      } else if (authorId) {
        const threadsFromAuthor: ThreadTypeSignedIn[] = await db.thread.findMany({
          where: { authorId },
          select: {
            id: true,
            title: true,
            content: true,
            tags: {
              select: {
                id: true,
                name: true
              }
            },
            author: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                rank: true,
                role: true,
                plan: true
              }
            },
            _count: {
              select: {
                downvotes: true,
                upvotes: true
              }
            },
            upvotes: {
              where: {
                authorId: userId
              }
            },
            downvotes: {
              where: {
                authorId: userId
              }
            },
            createdAt: true
          },
          orderBy: {
            createdAt: "desc"
          },
          take,
          skip
        });
        return NextResponse.json(threadsFromAuthor);
      } else {
        const threads: ThreadTypeSignedIn[] = await db.thread.findMany({
          select: {
            id: true,
            title: true,
            content: true,
            tags: {
              select: {
                id: true,
                name: true
              }
            },
            author: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                rank: true,
                role: true,
                plan: true
              }
            },
            _count: {
              select: {
                downvotes: true,
                upvotes: true
              }
            },
            upvotes: {
              where: {
                authorId: userId
              }
            },
            downvotes: {
              where: {
                authorId: userId
              }
            },
            createdAt: true
          },
          orderBy: {
            createdAt: "desc"
          },
          take,
          skip
        });
        return NextResponse.json(threads);
      }
    } catch (err) {
      console.log("[THREADS_GET_USER]", err);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

  try {
    if (tagId) {
      const threadsWithTag: { threads: ThreadType[] } | null = await db.tag.findUnique({
        where: { id: tagId },
        select: {
          threads: {
            select: {
              id: true,
              title: true,
              content: true,
              tags: {
                select: {
                  id: true,
                  name: true
                }
              },
              author: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true,
                  rank: true,
                  role: true,
                  plan: true
                }
              },
              _count: {
                select: {
                  downvotes: true,
                  upvotes: true
                }
              },
              createdAt: true
            },
            orderBy: {
              createdAt: "desc"
            },
            take,
            skip
          }
        }
      });

      return NextResponse.json(threadsWithTag?.threads);
    } else if (authorId) {
      const threadsFromAuthor: ThreadType[] = await db.thread.findMany({
        where: { authorId },
        select: {
          id: true,
          title: true,
          content: true,
          tags: {
            select: {
              id: true,
              name: true
            }
          },
          author: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              rank: true,
              role: true,
              plan: true
            }
          },
          _count: {
            select: {
              downvotes: true,
              upvotes: true
            }
          },
          createdAt: true
        },
        orderBy: {
          createdAt: "desc"
        },
        take,
        skip
      });

      return NextResponse.json(threadsFromAuthor);
    } else {
      const threads: ThreadType[] = await db.thread.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          tags: {
            select: {
              id: true,
              name: true
            }
          },
          author: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              rank: true,
              role: true,
              plan: true
            }
          },
          _count: {
            select: {
              downvotes: true,
              upvotes: true
            }
          },
          createdAt: true
        },

        orderBy: {
          createdAt: "desc"
        },
        take,
        skip
      });

      return NextResponse.json(threads);
    }
  } catch (err) {
    console.log("[THREADS_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();
    if (!currentUser || !currentUser.active) return new NextResponse("Unauthorized", { status: 401 });

    const { title, content, tags } = await req.json();

    let specialCharacters = false;
    let brokeMax = false;

    for (const element of tags) {
      if (containsSpecialCharacters(element)) specialCharacters = true;
      if (element.length >= 20) brokeMax = true;
    }

    if (title.length === 0) return new NextResponse("Title required", { status: 400 });
    if (title.length >= 100) return new NextResponse("Title too long", { status: 400 });
    if (content.length >= 1000) return new NextResponse("Content too long", { status: 400 });

    if (tags.length > 5) return new NextResponse("You can only add up to 5 tags", { status: 400 });
    else if (brokeMax) return new NextResponse("Tag needs to be under 20 characters", { status: 400 });
    else if (hasDuplicates(tags)) return new NextResponse("You can not have duplicate tags", { status: 400 });
    else if (tags.includes("")) return new NextResponse("Empty tags are not allowed", { status: 400 });
    else if (specialCharacters) return new NextResponse("Special characters are not allowed", { status: 400 });

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
        content: content.length === 0 ? null : content,
        tags: {
          connect: resolvedTags.map(tag => ({ id: tag.id }))
        },
        authorId: currentUser.id
      }
    });

    return NextResponse.json(thread.id);
  } catch (err) {
    console.log("[THREADS_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();
    if (!currentUser || !currentUser.active) return new NextResponse("Unauthorized", { status: 401 });

    const { id, title, content, tags } = await req.json();
    if (!id) return new NextResponse("Bad request", { status: 400 });

    let specialCharacters = false;
    let brokeMax = false;

    for (const element of tags) {
      if (containsSpecialCharacters(element)) specialCharacters = true;
      if (element.length >= 20) brokeMax = true;
    }

    const existingThread = await db.thread.findUnique({
      where: {
        id
      },
      select: {
        authorId: true,
        tags: true
      }
    });

    if (!existingThread) return new NextResponse("Bad request", { status: 400 });
    if (currentUser.id !== existingThread.authorId) return new NextResponse("Unauthorized", { status: 401 });
    if (title.length === 0) return new NextResponse("Title required", { status: 400 });
    if (title.length >= 100) return new NextResponse("Title too long", { status: 400 });
    if (content.length >= 1000) return new NextResponse("Content too long", { status: 400 });

    if (tags.length > 5) return new NextResponse("You can only add up to 5 tags", { status: 400 });
    else if (brokeMax) return new NextResponse("Tag needs to be under 20 characters", { status: 400 });
    else if (hasDuplicates(tags)) return new NextResponse("You can not have duplicate tags", { status: 400 });
    else if (tags.includes("")) return new NextResponse("Empty tags are not allowed", { status: 400 });
    else if (specialCharacters) return new NextResponse("Special characters are not allowed", { status: 400 });

    const thread = await db.thread.update({
      where: {
        id
      },
      data: {
        title,
        content: content.length === 0 ? null : content,
        tags: {
          disconnect: existingThread.tags.filter(oldTag => !tags.includes(oldTag.name)),
          connect: (
            await Promise.all(
              tags.map(async (tagName: string) => {
                return await db.tag.upsert({
                  where: { name: tagName },
                  update: {},
                  create: { name: tagName }
                });
              })
            )
          ).map(tag => ({ id: tag.id }))
        },
        authorId: currentUser.id,
        editedAt: new Date().toISOString()
      }
    });

    return NextResponse.json(thread.id);
  } catch (err) {
    console.log("[THREADS_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();
    if (!currentUser || !currentUser.active) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const threadId = searchParams.get("id");

    if (!threadId) return new NextResponse("Bad request", { status: 400 });

    const existingThread = await db.thread.findUnique({
      where: {
        id: threadId
      },
      select: {
        author: {
          select: {
            id: true
          }
        }
      }
    });

    if (!existingThread) return new NextResponse("Bad request", { status: 400 });
    if (currentUser.id !== existingThread.author.id) return new NextResponse("Unauthorized", { status: 401 });

    await db.thread.delete({
      where: {
        id: threadId
      }
    });

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("[THREADS_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
