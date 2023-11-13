import { NextPage } from "next";

const ManageUserPage: NextPage = () => {
  return (
    <div className="w-max mx-auto">
      <div className="grid grid-flow-col sm:grid-cols-[max-content_60vw] lg:grid-cols-[max-content_50vw] xl:grid-cols-[max-content_40vw]">
        <div className="grid-flow-row grid gap-1 p-2">
          <div>
            <p className="uppercase text-xs font-bold text-zinc-500 px-1">User settings</p>
          </div>
          <div className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md w-full cursor-pointer">My Account</div>
          <div className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md w-full cursor-pointer">Customization</div>
          <div className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md w-full cursor-pointer">Appearance</div>
          <div className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md w-full cursor-pointer">Accessibility</div>
          <div className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md w-full cursor-pointer">Log out</div>
        </div>
        <div className="bg-red-400 w-full">
          <p>manage user page</p>
        </div>
      </div>
    </div>
  );
};

export default ManageUserPage;
