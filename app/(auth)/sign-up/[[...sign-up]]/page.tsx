"use client";

import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to goldenageminecraft",
  openGraph: {
    title: "Sign up",
    description: "Sign up to goldenageminecraft"
  }
};

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <SignUp afterSignUpUrl="/signed-up" />;
}
