"use client";

import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <SignIn afterSignInUrl="/signed-in" />;
}
