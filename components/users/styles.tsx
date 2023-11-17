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

export const roleMap = {
  [UserRole.USER]: null,
  [UserRole.MODERATOR]: <Shield className="w-5 h-5 text-blue-500" />,
  [UserRole.ADMIN]: <Gavel className="w-5 h-5 text-rose-500" />,
  [UserRole.OWNER]: <Sailboat className="w-5 h-5 text-indigo-700" />
};
