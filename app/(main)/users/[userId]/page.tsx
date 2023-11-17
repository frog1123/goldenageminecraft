import { UserThreads } from "@/components/threads/user-threads";
import { UserInfo } from "@/components/users/user-info";
import { db } from "@/lib/db";
import { Metadata, NextPage, ResolvingMetadata } from "next";
import { UserProfileData } from "@/types/users";
import { getServerCurrentUser } from "@/lib/current-user";
import { ThreadVoteStats } from "@/types/threads";

interface UserIdPageProps {
  params: {
    userId: string;
  };
}

const UserIdPage: NextPage<UserIdPageProps> = async ({ params }) => {
  const user: UserProfileData | null = await db.user.findUnique({
    where: {
      id: params.userId
    },
    select: {
      id: true,
      name: true,
      firstName: true,
      lastName: true,
      bio: true,
      imageUrl: true,
      rank: true,
      role: true,
      plan: true,
      active: true,
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
      createdAt: true
    }
  });

  let voteStats: ThreadVoteStats = {
    receivedUpvotes: 0,
    receivedDownvotes: 0
  };

  user?.threads.forEach(thread => {
    voteStats.receivedUpvotes += thread._count.upvotes;
    voteStats.receivedDownvotes += thread._count.downvotes;
  });

  if (!user || !user.active)
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
        <p className="text-center">:( User does not exist or cannot be found</p>
      </div>
    );

  const currentUser = await getServerCurrentUser();

  const canEdit = currentUser?.id === user.id;

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

export async function generateMetadata({ params }: UserIdPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const user = await db.user.findUnique({
    where: {
      id: params.userId
    },
    select: {
      name: true,
      bio: true,
      imageUrl: true
    }
  });

  if (!user)
    return {
      title: "User profile",
      description: "User does not exist or cannot be found",
      openGraph: {
        title: "User profile",
        description: "User does not exist or cannot be found"
      }
    };

  if (!user.imageUrl)
    return {
      title: user.name,
      description: user.bio,
      openGraph: {
        title: user.name,
        description: user.bio
      }
    };

  return {
    title: user.name,
    description: user.bio,
    openGraph: {
      title: user.name,
      description: user.bio,
      images: [user.imageUrl]
    }
  };
}

export default UserIdPage;
