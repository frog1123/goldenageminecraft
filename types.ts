import { Thread, User, UserPlan, UserRank, UserRole } from "@prisma/client";

export interface CurrentUserType {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  avatar: {
    id: string;
    url: string;
  } | null;
  bio: string;
  rank: UserRank;
  role: UserRole;
  plan: UserPlan;
  active: boolean;
  createdAt: Date;
}

// prettier-ignore
export type ThreadType = Thread 
& { author: UserWithoutEmail } 
& { tags: { id: string; name: string }[] }
& { _count: { downvotes: number; upvotes: number } }
& { upvotes: any }
& { downvotes: any };

export type UserWithoutEmail = Omit<User, "email">;

export type UserThreadType = Omit<ThreadType, "author">;

export interface VoteStats {
  receivedUpvotes: number;
  receivedDownvotes: number;
}
