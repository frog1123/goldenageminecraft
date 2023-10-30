import { Thread, User } from '@prisma/client';

export type ThreadType = Thread & {
  author: UserWithoutEmail;
} & { tags: { id: string; name: string }[] };

export type UserWithoutEmail = Omit<User, 'email'>;

export type UserThreadType = Thread & { tags: { id: string; name: string }[] };
