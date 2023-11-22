import { UserPlan, UserRank, UserRole, Vote } from "@prisma/client";

export type ThreadTypeWithoutVotes = {
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
  createdAt: Date;
};

export type ThreadTypeWithVotes = ThreadTypeWithoutVotes & {
  count: {
    upvotes: number;
    downvotes: number;
  };
};

export type ThreadTypeSignedIn = ThreadTypeWithVotes & { signedInVote?: Vote };
export type ThreadType = ThreadTypeWithVotes;

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
    // threads: {
    //   _count: {
    //     upvotes: number;
    //     downvotes: number;
    //   };
    // }[];
    createdAt: Date;
  };
  tags: {
    id: string;
    name: string;
  }[];
  // _count: {
  //   upvotes: number;
  //   downvotes: number;
  // };
  count: {
    upvotes: number;
    downvotes: number;
  };
  editedAt: Date | null;
  createdAt: Date;
};

export type ThreadExpandedSignedType = ThreadExpandedUnsignedType & {
  signedInVote?: Vote;
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
        votes: number;
      };
    }[];
    createdAt: Date;
    _count: {
      threads: number;
    };
  };
  _count: {
    votes: number;
  };
  editedAt: Date | null;
  createdAt: Date;
};

export type ThreadReplySignedType = ThreadReplyUnsignedType & {
  signedInVote?: Vote;
};
