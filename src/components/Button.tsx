import React, { type ComponentProps } from "react";
import classNames from "classnames";

export const btnClasses =
  "shadow-lg transition text-lg px-3 py-1.5 w-fit rounded";
const Button = (
  props: ComponentProps<"button"> & {
    variant?: "primary" | "secondary";
  }
) => {
  const variant =
    props.variant === "secondary"
      ? "bg-neutral-600 hover:bg-neutral-700 disabled:bg-neutral-700 hover:text-slate-200"
      : " bg-pink-600 hover:bg-pink-800 hover:text-slate-200 disabled:bg-pink-950";
  const classes = classNames(btnClasses, variant, props.className);
  return (
    <button {...props} className={classes}>
      {props.children}
    </button>
  );
};

export default Button;
