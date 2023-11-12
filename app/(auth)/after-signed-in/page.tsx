"use client";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { db } from "@/lib/db";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AfterSignedInPage: NextPage = () => {
  const session = useSession();

  console.log("after sign in loaded", session);

  if (session.status === "loading")
    return (
      <div>
        <p>Please wait...</p>
      </div>
    );

  // const currentUser = db.user.findUnique({

  // })

  // if (!session || !currentUser)
  //   return (
  //     <div className="w-max grid grid-flow-row gap-2 place-items-center">
  //       <p>Couldn't authenticate your connection</p>
  //       <SignOutButton afterSignOutUrl="/" text="Sign out and return home" />
  //     </div>
  //   );

  // if (!currentUser.active)
  //   return (
  //     <div className="w-max">
  //       <p>Your account hasn't been activated</p>
  //       <SignOutButton afterSignOutUrl="/" text="Sign out and return home" />
  //     </div>
  //   );

  return (
    <div>
      <p>After sign in loaded</p>
    </div>
  );

  // return redirect("/");
};

export default AfterSignedInPage;
