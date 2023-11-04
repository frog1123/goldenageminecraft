import { SignOutButton } from "@/components/sign-out-button";
import { getCurrentUser } from "@/lib/current-user";
import { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signed in",
  openGraph: {
    title: "Signed in"
  }
};

const SignedInPage: NextPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) return redirect("/");

  if (!currentUser)
    return (
      <div className="text-center">
        <p>Something went wrong :/</p>
        <p>Try refreshing the page</p>
        <p>or</p>
        <div className="mt-2">
          <SignOutButton text="Sign out and return home" afterSignOutUrl="/" />
        </div>
      </div>
    );

  return (
    <div>
      <p>Please wait...</p>
    </div>
  );
};

export default SignedInPage;
