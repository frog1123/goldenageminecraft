import { Link } from "@/components/link";
import { db } from "@/lib/db";
import { Home } from "lucide-react";
import { NextPage } from "next";

interface ActivateTokenIdPageProps {
  params: {
    tokenId: string;
  };
}

const ActivateTokenIdPage: NextPage<ActivateTokenIdPageProps> = async ({ params }) => {
  const tokenId = params.tokenId;

  const activateToken = await db.activateToken.findUnique({
    where: {
      token: tokenId
    },
    select: {
      user: {
        select: {
          name: true,
          id: true
        }
      }
    }
  });

  if (!activateToken || !activateToken.user)
    return (
      <div>
        <p>Couldn't activate this user!</p>
      </div>
    );

  await db.user.update({
    where: {
      id: activateToken.user.id
    },
    data: {
      active: true
    }
  });

  return (
    <div className="grid place-items-center grid-flow-row gap-2">
      <p>
        Activated user: <span className="font-semibold">{activateToken.user.name}</span>
      </p>
      <Link href="/">
        <button className="bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px] text-white">
          <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Return home</span>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default ActivateTokenIdPage;
