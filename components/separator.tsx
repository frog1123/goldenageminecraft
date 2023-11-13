import { cn } from "@/lib/utils";
import { FC } from "react";

interface SeperatorProps {
  orientation: "horizontal" | "vertical";
  className?: string;
}

export const Seperator: FC<SeperatorProps> = ({ orientation, className }) => {
  return <div className={cn("bg-zinc-500 rounded-xl", orientation === "horizontal" ? "w-full h-[1px]" : "h-full w-[1px]", className)}></div>;
};
