import { AuthMethod, UserPlan, UserRank, UserRole } from "@prisma/client";

export interface CurrentUserType {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  bannerUrl: string | null;
  bio: string;
  rank: UserRank;
  role: UserRole;
  plan: UserPlan;
  active: boolean;
  authMethod: AuthMethod;
  createdAt: Date;
}

export type UserProfileData = {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  bannerUrl: string | null;
  bio: string;
  rank: UserRank;
  role: UserRole;
  plan: UserPlan;
  active: boolean;
  _count: {
    threads: number;
  };
  createdAt: Date;
};
