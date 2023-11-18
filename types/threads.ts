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

export type ThreadExpandedUnsignedType = {
  title: string;
  content: string | null;
  author: {
    id: string;
    name: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
    rank: UserRank;
    role: UserRole;
    plan: UserPlan;
    _count: {
      threads: number;
    };
    threads: {
      _count: {
        upvotes: number;
        downvotes: number;
      };
    }[];
    createdAt: Date;
  };
  tags: {
    id: string;
    name: string;
  }[];
  _count: {
    upvotes: number;
    downvotes: number;
  };
  editedAt: Date | null;
  createdAt: Date;
};

export type ThreadExpandedSignedType = ThreadExpandedUnsignedType & {
  upvotes: any[];
  downvotes: any[];
};

export type ThreadReplyUnsignedType = {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
    rank: UserRank;
    role: UserRole;
    plan: UserPlan;
    threads: {
      _count: {
        upvotes: number;
        downvotes: number;
      };
    }[];
    createdAt: Date;
    _count: {
      threads: number;
    };
  };
  _count: {
    upvotes: number;
    downvotes: number;
  };
  createdAt: Date;
};

export type ThreadReplySignedType = ThreadReplyUnsignedType & {
  upvotes: any[];
  downvotes: any[];
};
