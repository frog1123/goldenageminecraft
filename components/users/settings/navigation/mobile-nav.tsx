"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const UserSettingsMobileNav: FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed z-50 w-full">
      <div className="bg-neutral-200 dark:bg-neutral-900 py-2 px-4 w-full flex gap-2">
        <Sheet>
          <SheetTrigger>
            <div className="grid place-items-center">
              <Menu className="w-6 h-6 text-zinc-500" />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-full">
            <SheetHeader>
              <SheetTitle>test</SheetTitle>
              <SheetDescription>test</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="h-8 w-8"></div>
      </div>
      <Separator orientation="horizontal" className={cn("transition-all duration-500 mx-auto bg-gray-300 dark:bg-border", scrolled ? "w-full visible" : "w-0 invisible")} />
    </nav>
  );
};
