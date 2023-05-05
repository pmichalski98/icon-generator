import React from "react";
import classNames from "classnames";

const Input = (props: React.ComponentPropsWithRef<"input">) => {
  const classes = classNames(
    "w-fit rounded bg-slate-200/30 pl-2 text-lg outline-none",
    props.className
  );
  return <input {...props} className={classes} />;
};

export default Input;
