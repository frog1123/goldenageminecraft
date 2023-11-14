import { db } from "@/lib/db";
import { NextPage } from "next";

interface ActivateTokenIdPageProps {
  params: {
    tokenId: string;
  };
}

const ActivateTokenIdPage: NextPage<ActivateTokenIdPageProps> = async ({ params }) => {
  const tokenId = params.tokenId;

  console.log("token", tokenId);

  const activateToken = await db.activateToken.findUnique({
    where: {
      token: tokenId
    },
    select: {
      user: {
        select: {
          id: true
        }
      }
    }
  });

  console.log(activateToken);

  if (!activateToken)
    return (
      <div>
        <p>Couldn't activate this user!</p>
      </div>
    );

  return (
    <div>
      <p>{activateToken.user?.id}</p>
    </div>
  );
};

export default ActivateTokenIdPage;
