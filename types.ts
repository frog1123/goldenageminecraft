import { $Enums, Thread } from '@prisma/client';

export type ThreadType = Thread & { author: { id: string; userId: string; name: string; imageUrl: string; rank: $Enums.UserRank } };
