import { FC } from "react";
import { Link } from "@/components/link";
import { Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagProps {
  id: string;
  name: string;
}

type ThemeMap = {
  [key: string]: string;
};

export const Tag: FC<TagProps> = ({ id, name }) => {
  // prettier-ignore
  const themeMap: ThemeMap = {
    "beta-1.7.3": "bg-purple-300/40 hover:bg-purple-500/40",
    "build": "bg-emerald-300/40 hover:bg-emerald-500/40"
  };

  const defaultTheme = "bg-blue-500/25 hover:bg-blue-800/25";
  const wordColor = themeMap[name.toLowerCase()] || defaultTheme;

  return (
    <Link href={`/forums/tags/${id}`}>
      <div className={cn(wordColor, "transition p-1 rounded-md grid grid-cols-[max-content_max-content] place-items-center")}>
        <Hash className="w-4 h-4" />
        <span className="items-center">{name}</span>
      </div>
    </Link>
  );
};
