import { UserPlan, UserRank, UserRole } from "@prisma/client";

export type ThreadType = {
  id: string;
  title: string;
  content: string | null;
  author: {
    id: string;
    name: string;
    imageUrl: string | null;
    rank: UserRank;
    role: UserRole;
    plan: UserPlan;
  };
  tags: Array<{
    id: string;
    name: string;
  }>;
  _count: {
    downvotes: number;
    upvotes: number;
  };
  createdAt: Date;
};

export type ThreadTypeSignedIn = ThreadType & { upvotes: any; downvotes: any };

export interface ThreadVoteStats {
  receivedUpvotes: number;
  receivedDownvotes: number;
}
