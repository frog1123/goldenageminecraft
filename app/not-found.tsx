import { Metadata, NextPage } from "next";
import NotFound from "@/components/page-not-found";

export const metadata: Metadata = {
  title: "Not found",
  description: "This is content doesn't exist or could not be found",
  openGraph: {
    title: "Not found",
    description: "This is content doesn't exist or could not be found"
  }
};

const NotFoundPage: NextPage = () => {
  return <NotFound message="Page not found :/" />;
};

export default NotFoundPage;
