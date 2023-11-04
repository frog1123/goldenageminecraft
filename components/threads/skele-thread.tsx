import { Dot } from "lucide-react";
import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeleThread: FC = () => {
  const w = Math.floor(Math.random() * (80 - 30 + 1)) + 30;

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto">
      <div className="grid grid-flow-row gap-1">
        <div className="grid grid-flow-col">
          <div className="grid grid-flow-col w-max place-items-center">
            <div className="grid grid-flow-col place-items-center gap-1 rounded-md">
              <Skeleton className="h-6 w-[140px]" />
            </div>
            <Dot className="w-4 h-4 text-gray-500" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
          <div className="grid grid-cols-[auto_max-content] gap-2 w-max place-items-center ml-auto"></div>
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5" style={{ width: `${w}%` }} />
        <div className="mt-1">
          <Skeleton className="h-6 w-[80px]" />
        </div>
      </div>
    </div>
  );
};
