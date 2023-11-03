import { FC } from "react";
import { Link as ProgressLink } from "nextjs13-progress";

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: FC<LinkProps> = ({ href, className, children }) => {
  return (
    <ProgressLink href={href} className={className}>
      {children}
    </ProgressLink>
  );
};
