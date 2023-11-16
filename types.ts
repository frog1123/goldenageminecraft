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

export type ThreadType = {
  id: string;
  title: string;
  content: string | null;
  author: {
    id: string;
    name: string;
    avatar: {
      url: string;
    } | null;
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

export type ThreadTypeSignedIn = {
  id: string;
  title: string;
  content: string | null;
  author: {
    id: string;
    name: string;
    avatar: {
      url: string;
    } | null;
    rank: UserRank;
    role: UserRole;
    plan: UserPlan;
  };
  tags: Array<{
    id: string;
    name: string;
  }>;
  upvotes: any;
  downvotes: any;
  _count: {
    downvotes: number;
    upvotes: number;
  };
  createdAt: Date;
};

export type UserWithoutEmail = Omit<User, "email">;

export type UserThreadType = Omit<ThreadType, "author">;

export interface VoteStats {
  receivedUpvotes: number;
  receivedDownvotes: number;
}
