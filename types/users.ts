import { UserPlan, UserRank, UserRole } from "@prisma/client";

export interface CurrentUserType {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  bio: string;
  rank: UserRank;
  role: UserRole;
  plan: UserPlan;
  active: boolean;
  createdAt: Date;
}

export type UserProfileData = {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  bio: string;
  rank: UserRank;
  role: UserRole;
  plan: UserPlan;
  active: boolean;
  _count: {
    threads: number;
  };
  imageUrl: string | null;
  threads: {
    _count: {
      upvotes: number;
      downvotes: number;
    };
  }[];
  createdAt: Date;
};
