import { UserThreads } from "@/components/threads/user-threads";
import { UserInfo } from "@/components/users/user-info";
import { db } from "@/lib/db";
import { NextPage } from "next";
import { currentUser as clerkCurrentUser } from "@clerk/nextjs";
import { VoteStats } from "@/types";

interface UserIdPageProps {
  params: {
    userId: string;
  };
}

const UserIdPage: NextPage<UserIdPageProps> = async ({ params }) => {
  const user = await db.user.findUnique({
    where: {
      id: params.userId
    },
    select: {
      id: true,
      userId: true,
      name: true,
      firstName: true,
      lastName: true,
      bio: true,
      imageUrl: true,
      rank: true,
      role: true,
      plan: true,
      _count: {
        select: {
          threads: true
        }
      },
      threads: {
        select: {
          _count: {
            select: {
              upvotes: true,
              downvotes: true
            }
          }
        }
      },
      createdAt: true,
      updatedAt: true
    }
  });

  let voteStats: VoteStats = {
    receivedUpvotes: 0,
    receivedDownvotes: 0
  };

  user?.threads.forEach(thread => {
    voteStats.receivedUpvotes += thread._count.upvotes;
    voteStats.receivedDownvotes += thread._count.downvotes;
  });

  if (!user)
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
        <p className="text-center">:( User does not exist or cannot be found</p>
      </div>
    );

  const clerkUser = await clerkCurrentUser();

  const canEdit = user.userId === clerkUser?.id;

  return (
    <>
      <UserInfo user={user} voteStats={voteStats} canEdit={canEdit} />
      {user._count.threads > 0 && (
        <div className="grid grid-cols-2 gap-2 place-items-center">
          <p className="mr-auto uppercase text-xs font-bold text-zinc-500">Activity</p>
          <p className="ml-auto uppercase text-xs font-bold text-zinc-500 ">{user._count.threads} Threads</p>
        </div>
      )}
      <UserThreads authorId={params.userId} canEdit={canEdit} />
    </>
  );
};

export default UserIdPage;
