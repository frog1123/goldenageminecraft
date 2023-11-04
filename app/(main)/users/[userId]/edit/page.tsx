import { EditUserForm } from "@/components/users/edit-form";
import { getCurrentUser } from "@/lib/current-user";
import { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile edit",
  description: "This is the profile edit page"
};
interface UserIdEditPageProps {
  params: {
    userId: string;
  };
}

const UserIdEditPage: NextPage<UserIdEditPageProps> = async ({ params }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || params.userId !== currentUser.id) {
    return redirect("/");
  }

  return (
    <div>
      <EditUserForm user={currentUser} />
    </div>
  );
};

export default UserIdEditPage;
