"use client";

import dark_spinner from "@/public/assets/spinners/dark_spinner.svg";
import light_spinner from "@/public/assets/spinners/light_spinner.svg";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const LoadingIcon: FC = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const themeMap = {
    dark: <Image src={dark_spinner} alt="loading" />,
    light: <Image src={light_spinner} alt="loading" />
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) return <div>{theme && themeMap[theme as keyof typeof themeMap]}</div>;
};

export default LoadingIcon;
