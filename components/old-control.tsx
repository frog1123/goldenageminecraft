"use client";

import { Context } from "@/context";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { FC, useContext, useEffect, useState } from "react";
import { Command, Newspaper, PenSquare, Search, User } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

export const Control: FC = () => {
  const modal = useModal();
  const context = useContext(Context);
  const router = useRouter();

  const signedIn = !!context.value.currentUser?.id;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-cols-[auto_max-content] gap-2">
        <div
          onClick={() => setOpen(true)}
          className="cursor-pointer group py-1 px-2 rounded-md flex items-center gap-x-2 w-full bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition"
        >
          <Search className="w-4 h-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-gray-300 transition" />
          <p className="pointer-events-none text-gray-500 group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-gray-300 transition">Search (wip)</p>
          <div className="hidden md:block ml-auto">
            <kbd className="pointer-events-none">
              <div className="grid grid-flow-col place-items-center gap-[2px]">
                <Command className="w-4 h-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-gray-300 transition" />
                <span className="font-semibold text-gray-500 group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-gray-300 transition">K</span>
              </div>
            </kbd>
          </div>
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
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search (wip)" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Threads" className="p-2">
            <CommandItem>
              <Newspaper className="mr-2 h-4 w-4" />
              <span>Thread</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Users" className="p-2">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>User</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
