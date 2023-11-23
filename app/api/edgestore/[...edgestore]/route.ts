import { getServerCurrentUserId } from "@/lib/current-user-id";
import { db } from "@/lib/db";
import { CurrentUserType } from "@/types/users";
import { initEdgeStore } from "@edgestore/server";
import { type CreateContextOptions, createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { z } from "zod";

type EdgeStoreContextType = {
  currentUserId: string | null;
};

const createContext = async ({ req }: CreateContextOptions): Promise<EdgeStoreContextType> => {
  const currentUserId = await getServerCurrentUserId();
  console.log("edge", currentUserId);

  return {
    currentUserId
  };
};

const es = initEdgeStore.context<EdgeStoreContextType>().create();

const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket()
    .input(z.object({ type: z.enum(["avatar"]) }))
    .beforeUpload(({ ctx, fileInfo }) => {
      console.log("beforeUpload", ctx, fileInfo);
      if (!ctx.currentUserId) return false;

      return true; // allow upload
    })
    .beforeDelete(async ({ ctx, fileInfo }) => {
      console.log("beforeDelete", ctx, fileInfo);
      if (!ctx.currentUserId) return false;

      await db.user.update({
        where: {
          id: ctx.currentUserId
        },
        data: {
          imageUrl: null
        }
      });

      return true; // allow delete
    })
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
