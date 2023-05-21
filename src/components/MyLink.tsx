import React, { type ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import button from "~/components/Button";

interface LinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}
const MyLink = ({ href, className, children }: LinkProps) => {
  const router = useRouter();
  const activeStyles =
    router.pathname === href && " border-l-4 pl-1 rounded border-rose-400/60 ";

  const classes = classNames(
    "font-medium hover:text-gray-300 ",
    className,
    activeStyles
  );

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
};

export default MyLink;
