"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import { Menu, X } from "lucide-react";
import { FC, useContext, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserSettingsNavContent } from "@/components/users/settings/navigation/nav-content";
import { Context } from "@/context";
import { Link } from "@/components/link";

export const UserSettingsMobileNav: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const context = useContext(Context);

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

  const handleSheetChange = () => {
    context.setValue({ ...context.value, mobileUserSettingsNavOpen: !context.value.mobileUserSettingsNavOpen });
  };

  return (
    <nav className="fixed z-50 w-full">
      <div className="bg-neutral-200 dark:bg-neutral-900 py-2 px-4 w-full flex gap-2">
        <Sheet open={context.value.mobileUserSettingsNavOpen} onOpenChange={handleSheetChange}>
          <SheetTrigger onClick={handleSheetChange}>
            <div className="grid place-items-center">
              <Menu className="w-6 h-6 text-zinc-500" />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] max-w-full block sm:hidden">
            <div className="grid grid-flow-row gap-1">
              <UserSettingsNavContent mobile={true} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="h-8"></div>
        <div className="grid place-items-center ml-auto">
          <Link href="/">
            <div className="grid place-items-center">
              <X className="w-6 h-6 text-zinc-500" />
            </div>
          </Link>
        </div>
      </div>
      <Separator orientation="horizontal" className={cn("transition-all duration-500 mx-auto bg-gray-300 dark:bg-border", scrolled ? "w-full visible" : "w-0 invisible")} />
    </nav>
  );
};
