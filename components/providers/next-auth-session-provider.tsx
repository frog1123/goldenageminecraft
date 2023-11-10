"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";

export const NextAuthSessionProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
