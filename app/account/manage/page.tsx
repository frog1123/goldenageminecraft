import { NextPage } from "next";

const ManageUserPage: NextPage = () => {
  return (
    <div className="w-max mx-auto">
      <div className="grid grid-flow-col sm:grid-cols-[max-content_60vw] lg:grid-cols-[max-content_50vw] xl:grid-cols-[max-content_40vw]">
        <div>
          <div>User settings</div>
          <div>My Account</div>
        </div>
        <div className="bg-red-400 w-full">
          <p>manage user page</p>
        </div>
      </div>
    </div>
  );
};

export default ManageUserPage;
