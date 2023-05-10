import React, { type ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames";

interface LinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}
const MyLink = ({ href, className, children }: LinkProps) => {
  const classes = classNames("font-medium hover:text-gray-300", className);
  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
};

export default MyLink;
