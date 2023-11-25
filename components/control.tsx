"use client";

import { Context } from "@/context";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { FC, useContext } from "react";
import { BarChart, Clock, PenSquare, Search } from "lucide-react";

export const Control: FC = () => {
  const modal = useModal();
  const context = useContext(Context);
  const router = useRouter();

  const signedIn = !!context.value.currentUser?.id;

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-cols-[auto_max-content] gap-2">
      <div className="group py-1 px-2 rounded-md flex items-center gap-x-2 w-full bg-neutral-300 dark:bg-neutral-800">
        <Search className="w-4 h-4 text-gray-500 transition" />
        <input placeholder="search (wip)" className="border-none bg-transparent focus:outline-none" />
      </div>
      <div className="ml-auto">
        <button
          onClick={() => {
            if (!signedIn) modal.onOpen("sign-in-req");
            else router.push("/forums/threads/create");
          }}
          className="bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-full text-white"
        >
          <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
            <PenSquare className="w-4 h-4" />
            <span>Create thread</span>
          </div>
        </button>
      </div>
      <div className="grid grid-flow-col gap-1 place-items-center w-max">
        <div className="dark:border-border border-zinc-400 border-[1px] rounded-md w-max p-1 cursor-pointer dark:hover:bg-neutral-800/50 hover:bg-neutral-300/50 transition">
          <div className="grid grid-cols-[max-content_auto] gap-1 text-zinc-500 place-items-center">
            <Clock className="w-4 h-4" />
            <p className="uppercase text-sm font-bold">Sort time</p>
          </div>
        </div>
        <div className="dark:border-border border-zinc-400 border-[1px] rounded-md w-max p-1 cursor-pointer dark:hover:bg-neutral-800/50 hover:bg-neutral-300/50 transition">
          <div className="grid grid-cols-[max-content_auto] gap-1 text-zinc-500 place-items-center">
            <BarChart className="w-4 h-4" />
            <p className="uppercase text-sm font-bold">Sort popularity</p>
          </div>
        </div>
      </div>
    </div>
  );
};
