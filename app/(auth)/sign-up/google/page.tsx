import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SignUpGoogleForm } from "@/components/auth/sign-up-form-google";
import { Link } from "@/components/link";
import { db } from "@/lib/db";
import { Home } from "lucide-react";
import { NextPage } from "next";
import { getServerSession } from "next-auth";

const SignUpGooglePage: NextPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    const existingGoogleUser = await db.user.findUnique({
      where: {
        email: session.user.email,
        authMethod: "GOOGLE"
      }
    });

    if (existingGoogleUser)
      return (
        <div className="w-full sm:w-[400px] mx-auto">
          <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md overflow-hidden">
            <div className="bg-emerald-500 h-1 hidden sm:block"></div>
            <div className="p-4">
              <p className="text-center">Account already exists</p>
              <p className="text-center">You do not have to register a new one</p>
              <p className="text-center">You have been signed in automatically</p>
              <div className="w-full grid place-items-center mt-2">
                <Link href="/">
                  <button className="bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px] text-white">
                    <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
                      <Home className="w-4 h-4" />
                      <span>Return home</span>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="w-full sm:w-[400px] mx-auto">
      <SignUpGoogleForm />
    </div>
  );
};

export default SignUpGooglePage;
