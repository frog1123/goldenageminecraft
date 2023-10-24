import { $Enums, Thread, User } from '@prisma/client';

export type ThreadType = Thread & {
  author: { id: string; userId: string; name: string; imageUrl: string; rank: $Enums.UserRank; role: $Enums.UserRole; plan: $Enums.UserPlan };
} & { tags: { id: string; name: string }[] };

export type UserWithoutEmail = Omit<User, 'email'>;
