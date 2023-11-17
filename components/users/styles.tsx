import Image from "next/image";

import { UserRank, UserRole } from "@prisma/client";
import { Gavel, Sailboat, Shield } from "lucide-react";

import coal from "@/public/assets/ranks/coal.png";
import iron from "@/public/assets/ranks/iron.png";
import gold from "@/public/assets/ranks/gold.png";
import redstone from "@/public/assets/ranks/redstone.png";
import lapis from "@/public/assets/ranks/lapis.png";
import diamond from "@/public/assets/ranks/diamond.png";

export const rankMap = {
  [UserRank.COAL]: <Image src={coal} alt="rank" fill />,
  [UserRank.IRON]: <Image src={iron} alt="rank" fill />,
  [UserRank.GOLD]: <Image src={gold} alt="rank" fill />,
  [UserRank.REDSTONE]: <Image src={redstone} alt="rank" fill />,
  [UserRank.LAPIS]: <Image src={lapis} alt="rank" fill />,
  [UserRank.DIAMOND]: <Image src={diamond} alt="rank" fill />
};

export const rankColorMap = {
  [UserRank.COAL]: "bg-neutral-950",
  [UserRank.IRON]: "bg-neutral-400",
  [UserRank.GOLD]: "bg-yellow-500",
  [UserRank.REDSTONE]: "bg-red-800",
  [UserRank.LAPIS]: "bg-blue-600",
  [UserRank.DIAMOND]: "bg-cyan-500"
};

export const roleIconMap = {
  [UserRole.USER]: null,
  [UserRole.MODERATOR]: <Shield className="w-5 h-5 text-white" />,
  [UserRole.ADMIN]: <Gavel className="w-5 h-5 text-white" />,
  [UserRole.OWNER]: <Sailboat className="w-5 h-5 text-white" />
};

export const roleIconMapColored = {
  [UserRole.USER]: null,
  [UserRole.MODERATOR]: <Shield className="w-5 h-5 text-blue-500" />,
  [UserRole.ADMIN]: <Gavel className="w-5 h-5 text-rose-500" />,
  [UserRole.OWNER]: <Sailboat className="w-5 h-5 text-indigo-700" />
};

export const roleColorMap = {
  [UserRole.USER]: null,
  [UserRole.MODERATOR]: "bg-blue-500",
  [UserRole.ADMIN]: "bg-rose-500",
  [UserRole.OWNER]: "bg-indigo-700"
};
