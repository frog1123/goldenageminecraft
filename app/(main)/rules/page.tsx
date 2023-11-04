import { ClipboardList } from "lucide-react";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Rules",
  description: "This is the rules page",
  openGraph: {
    title: "Rules",
    description: "This is the rules page"
  }
};

const RulesPage: NextPage = () => {
  return (
    <>
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
        <div className="grid grid-cols-[max-content_auto] gap-1 place-items-center w-max">
          <ClipboardList className="w-4 h-4 text-zinc-500" />
          <span className="uppercase text-xs font-bold text-zinc-500">RULES</span>
        </div>
        todo: add rules
      </div>
    </>
  );
};

export default RulesPage;
