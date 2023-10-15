import { Thread, User } from '@prisma/client';

export type ThreadWithAuthor = Thread & { author: User };
