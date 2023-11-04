"use client";

import { Context } from "@/context";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { FC, useContext, useEffect, useState } from "react";
import { Calculator, Calendar, Command, CreditCard, Search, Settings, Smile, User } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

const Control: FC = () => {
  const modal = useModal();
  const context = useContext(Context);
  const router = useRouter();

  const signedIn = !!context.value.currentUser.id;

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
          className="group py-1 px-2 rounded-md flex items-center gap-x-2 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition"
        >
          <Search className="w-4 h-4 text-gray-500 group-hover:text-white transition" />
          <p className="text-gray-500 group-hover:text-white transition">Search</p>
          <kbd className="text-xs pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
            <span className="text-xs">
              <Command className="w-[10px] h-[10px]" />
            </span>
            K
          </kbd>
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
      <div className="rounded-lg border shadow-md">
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </>
  );
};

export default Control;
