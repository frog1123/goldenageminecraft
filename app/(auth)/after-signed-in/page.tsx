import { SignOutButton } from "@/components/auth/sign-out-button";
import { getServerCurrentUser } from "@/lib/current-user";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AfterSignedInPage: NextPage = async () => {
  const currentUser = await getServerCurrentUser();
  const session = await getServerSession();

  if (!session || !currentUser)
    return (
      <div className="w-max grid grid-flow-row gap-2 place-items-center">
        <p>Couldn't authenticate your connection</p>
        <SignOutButton afterSignOutUrl="/" text="Sign out and return home" />
      </div>
    );

  if (!currentUser.active)
    return (
      <div className="w-max">
        <p>Your account hasn't been activated</p>
        <SignOutButton afterSignOutUrl="/" text="Sign out and return home" />
      </div>
    );

  return redirect("/");
};

export default AfterSignedInPage;
