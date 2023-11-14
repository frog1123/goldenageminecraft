import { SignInButton } from "@/components/auth/sign-in-button";
import { db } from "@/lib/db";
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
        <p>Couldn&apos;t activate this user!</p>
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
      <SignInButton />
    </div>
  );
};

export default ActivateTokenIdPage;
