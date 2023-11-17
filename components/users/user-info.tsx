import { FC } from "react";
import Image from "next/image";
import { formatDateLong } from "@/utils/format-date-long";
import { Crown, Edit, Palmtree } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/separator";
import { VotesRatio } from "../votes-ratio";
import { Link } from "@/components/link";
import { Content } from "@/components/content";
import { defaultUserProfilePicture } from "@/lib/default-profile-picture";
import { UserProfileData } from "@/types/users";
import { rankColorMap, rankMap, roleColorMap, roleIconMap } from "@/components/users/styles";

interface UserInfoProps {
  user: UserProfileData;
  voteStats: {
    receivedUpvotes: number;
    receivedDownvotes: number;
  };
  canEdit: boolean;
}

export const UserInfo: FC<UserInfoProps> = ({ user, voteStats, canEdit }) => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
      <div className="grid grid-cols-[max-content_max-content_auto] gap-2">
        <div className="grid grid-flow-row place-items-center gap-2">
          <div className="w-28 h-28 rounded-md overflow-hidden relative">
            {user.imageUrl ? <Image src={user.imageUrl} fill alt="author" /> : <Image src={defaultUserProfilePicture()} fill alt="author" />}
          </div>
          <div className="grid grid-flow-row gap-0 place-items-center">
            <p className="font-semibold p-1">{user.name}</p>
            {(user.firstName || user.lastName) && (
              <p className="font-semibold">
                {user.firstName && <span>{user.firstName}</span>} {user.lastName && <span>{user.lastName}</span>}
              </p>
            )}
          </div>
          <p className="uppercase text-xs font-bold text-zinc-500">Joined {formatDateLong(user.createdAt.toString())}</p>
          <div className="w-full my-1">
            <VotesRatio votesStats={voteStats} expanded />
          </div>
          <div className="w-full rounded-md overflow-hidden">
            <div className={cn("grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1", rankColorMap[user.rank])}>
              <div className="w-6 h-6 overflow-hidden relative">{rankMap[user.rank]}</div>
              <span className="mr-auto font-semibold text-white">{user.rank}</span>
            </div>
            {user.role !== "USER" && (
              <div className={cn("grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1", roleColorMap[user.role])}>
                <div className="w-6 h-6 overflow-hidden relative">{roleIconMap[user.role]}</div>
                <span className="mr-auto font-semibold text-white">{user.role}</span>
              </div>
            )}
            {user.plan === "PREMIUM" && (
              <div className="grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center bg-pink-500 p-1">
                <div className="w-6 h-6 overflow-hidden relative">
                  <Crown className="text-white" />
                </div>
                <span className="mr-auto font-semibold text-white">{user.plan}</span>
              </div>
            )}
          </div>
        </div>
        <Separator orientation="vertical" />
        <div>
          {canEdit ? (
            <Link href={`/users/${user.id}/edit`}>
              <div className="grid grid-flow-col place-items-center w-max gap-1 mr-auto hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md">
                <div>
                  <Edit className="w-4 h-4 text-zinc-500" />
                </div>
                <p className="uppercase font-bold text-zinc-500">Bio</p>
              </div>
            </Link>
          ) : (
            <div className="grid grid-flow-col place-items-center w-max gap-1 mr-auto p-1 rounded-md">
              <div>
                <Palmtree className="w-4 h-4 text-zinc-500" />
              </div>
              <p className="uppercase font-bold text-zinc-500">Bio</p>
            </div>
          )}
          {user.bio && <Content text={user.bio} />}
        </div>
      </div>
    </div>
  );
};
