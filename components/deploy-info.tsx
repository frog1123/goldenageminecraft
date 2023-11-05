"use client";

import { FC, useEffect, useState } from "react";
import { GitBranch, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import grass_block_old from "@/public/assets/grass_block_old.png";
import { cn } from "@/lib/utils";

const sites = [
  {
    name: "goldenageminecraft.net",
    href: "https://goldenageminecraft.net",
    branch: "master"
  },
  {
    name: "www.goldenageminecraft.net",
    href: "https://www.goldenageminecraft.net",
    branch: "master"
  },
  {
    name: "goldenageminecraft.vercel.app",
    href: "https://goldenageminecraft.net",
    branch: "master"
  },
  {
    name: "staging.goldenageminecraft.net",
    href: "https://staging.goldenageminecraft.net",
    branch: "staging"
  }
];

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
          This site is deployed from the <span className="text-zinc-500 font-semibold">master</span> branch, representing the production version. The production and
          development versions have separate databases, so user and thread data are not shared between them.
        </p>
      ) : (
        <p className="break-words whitespace-pre-wrap">
          This site is deployed from the <span className="text-zinc-500 font-semibold">staging</span> branch, representing the development version. The production and
          development versions have separate databases, so user and thread data are not shared between them.
        </p>
      )}
      <br />
      <p>Here are the prod and dev versions of this site: </p>

      <div className="grid grid-cols-[max-content_max-content_max-content] gap-2 p-1">
        <div className="grid grid-flow-row gap-1">
          {sites.map(s => (
            <div className={cn("grid grid-cols-[max-content_auto] place-items-center w-max gap-1", domain === s.name ? "text-white" : "text-zinc-500 ")}>
              <GitBranch className="w-4 h-4" />
              <p className="font-semibold">{s.branch}</p>
            </div>
          ))}
        </div>
        <Separator orientation="vertical" />
        <div className="grid grid-flow-row gap-1">
          {sites.map(s => {
            if (domain === s.name)
              return (
                <div>
                  <div className="grid grid-cols-[max-content_auto] place-items-center w-max gap-1 bg-neutral-300 dark:bg-neutral-800 p-1 rounded-md">
                    <div className="w-4 h-4">
                      <Image src={grass_block_old} alt="logo" />
                    </div>
                    <span>{s.name}</span>
                  </div>
                </div>
              );
            else
              return (
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <div className="grid grid-cols-[max-content_auto] place-items-center w-max gap-1 hover:bg-neutral-300 dark:hover:bg-neutral-800 transition p-1 rounded-md">
                    <div className="w-4 h-4">
                      <Image src={grass_block_old} alt="logo" />
                    </div>
                    <span>{s.name}</span>
                  </div>
                </a>
              );
          })}
        </div>
      </div>
    </div>
  );
};
