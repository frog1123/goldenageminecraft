import { Thread, User } from "@prisma/client";

export interface CurrentUserType {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  bio: string;
  rank: string;
  role: string;
  plan: string;
  active: boolean;
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
