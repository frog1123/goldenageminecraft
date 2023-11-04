"use client";

import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to goldenageminecraft",
  openGraph: {
    title: "Sign in",
    description: "Sign in to goldenageminecraft",
  }
};

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <SignIn afterSignInUrl="/signed-in" />;
}
