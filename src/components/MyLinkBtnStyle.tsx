import React, { type ReactNode } from "react";
import classNames from "classnames";
import Link, { type LinkProps } from "next/link";

export const btnClasses =
  "shadow-lg transition text-lg px-3 py-1.5 w-fit rounded";
const MyLinkBtnStyle = (
  props: LinkProps & { children: ReactNode } & {
    variant?: "secondary" | "primary";
  } & { className?: string }
) => {
  const variant =
    props.variant === "secondary"
      ? "bg-neutral-600 hover:bg-neutral-700 hover:text-slate-200"
      : " bg-pink-600 hover:bg-pink-800 hover:text-slate-200";
  const classes = classNames(btnClasses, variant, props.className);
  return (
    <Link {...props} className={classes}>
      {props.children}
    </Link>
  );
};

export default MyLinkBtnStyle;
