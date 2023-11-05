"use client";

import { FC, useEffect, useState } from "react";
import { GitBranch, Globe } from "lucide-react";

export const DeployInfo: FC = () => {
  const [domain, setDomain] = useState("");

  useEffect(() => {
    const currentDomain = window.location.host;
    setDomain(currentDomain);
  }, []);

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto">
      <div className="grid grid-cols-[max-content_auto] gap-1 place-items-center w-max">
        <Globe className="w-4 h-4 text-zinc-500" />
        <span className="uppercase text-xs font-bold text-zinc-500">SITE INFO</span>
      </div>
      <p className="font-semibold text-lg break-words w-max">{domain}</p>
      {process.env.NODE_ENV === "production" ? (
        <p className="break-words whitespace-pre-wrap">
          This site is being deployed from the `master` branch, meaning this is the production version of the website. Keep in mind that the prod and dev version of the site
          have different databases so data like users and threads are not shared between them.
        </p>
      ) : (
        <p className="break-words whitespace-pre-wrap">
          This site is being deployed from the <span>staging</span> branch, meaning this is the development version of the website. Keep in mind that the prod and dev version
          of the site have different databases so data like users and threads are not shared between them.
        </p>
      )}
    </div>
  );
};
