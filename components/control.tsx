"use client";

import { Context } from "@/context";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { FC, useContext } from "react";

const Control: FC = () => {
  const modal = useModal();
  const context = useContext(Context);
  const router = useRouter();

  const signedIn = !!context.value.currentUser.id;

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-cols-[auto_max-content] gap-2">
      <div>
        <input
          placeholder="Search (wip)"
          className="w-full h-full bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 rounded-md"
        />
      </div>
      <div className="ml-auto">
        <button
          onClick={() => {
            if (!signedIn) modal.onOpen("sign-in-req");
            else router.push("/forums/threads/create");
          }}
          className="bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-full"
        >
          <p className="text-white">Create thread</p>
        </button>
      </div>
    </div>
  );
};

export default Control;
