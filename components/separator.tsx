import { cn } from "@/lib/utils";
import { FC } from "react";

interface SeperatorProps {
  orientation: "horizontal" | "vertical";
  className?: string;
}

export const Seperator: FC<SeperatorProps> = ({ orientation, className }) => {
  return <div className={cn("bg-zinc-500 rounded-md", orientation === "horizontal" ? "w-full h-[2px]" : "h-full w-[2px]", className)}></div>;
};
