"use client";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { Context } from "@/context";
import { CurrentUserType } from "@/types/users";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const AfterSignedInPage: NextPage = () => {
  const session = useSession();
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>();
  const context = useContext(Context);

  useEffect(() => {
    if (!session.data) return;

    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/api/current-user");
        setCurrentUser(res.data);
      } catch (err) {
        console.log("error fetching current user", err);
      }
    };

    fetchCurrentUser();
  }, [session]);

  if (session.status === "unauthenticated" && !currentUser) redirect("/");

  if (session.status === "loading" || !currentUser)
    return (
      <div>
        <p>Please wait...</p>
      </div>
    );

  if (!session.data)
    return (
      <div className="w-max grid grid-flow-row gap-2 place-items-center">
        <p>Couldn&apos;t authenticate your connection</p>
        <SignOutButton afterSignOutUrl="/" text="Sign out and return home" />
      </div>
    );

  if (!currentUser.active)
    return (
      <div className="w-max grid grid-flow-row gap-2 place-items-center">
        <p>Your account hasn&apos;t been activated</p>
        <SignOutButton afterSignOutUrl="/" text="Sign out and return home" />
      </div>
    );

  context.setValue({ ...context.value, currentUser });

  return redirect("/");
};

export default AfterSignedInPage;
