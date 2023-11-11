import { getServerCurrentUser } from "@/lib/current-user";
import { NextPage } from "next";
import { redirect } from "next/navigation";

const SignUpPage: NextPage = async () => {
  const currentUser = await getServerCurrentUser();

  if (!currentUser)
    return (
      <div className="w-max">
        <p>Couldn't authenticate your connection</p>
      </div>
    );

  // if (!currentUser.active)
  //   return (
  //     <div className="w-max">
  //       <p>Your account hasn't been activated</p>
  //     </div>
  //   );

  return redirect("/");
};

export default SignUpPage;
