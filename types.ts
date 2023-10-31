import { Thread, User } from '@prisma/client';

// prettier-ignore
export type ThreadType = Thread & {
  author: UserWithoutEmail;
} 
& { tags: { id: string; name: string }[] }
& { _count: { downvotes: number; upvotes: number } }
& { upvotes: any }
& { downvotes: any};

export type UserWithoutEmail = Omit<User, 'email'>;

export type UserThreadType = Thread & { tags: { id: string; name: string }[] };
