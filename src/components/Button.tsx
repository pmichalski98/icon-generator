import React, { ReactNode } from "react";
import classNames from "classnames";
const Button = (props: React.ComponentPropsWithoutRef<"button">) => {
  const classes = classNames(
    "hover:bg-pink-800 hover:text-slate-200 transition bg-pink-600 text-xl px-6 py-1.5 w-fit rounded ",
    props.className
  );
  return (
    <button {...props} className={classes}>
      {props.children}
    </button>
  );
};

export default Button;
