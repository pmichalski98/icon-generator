import React, { type ComponentPropsWithRef } from "react";
import classNames from "classnames";

const FormGroup = (props: ComponentPropsWithRef<"div">) => {
  const classes = classNames("flex flex-col gap-4", props.className);
  return (
    <div {...props} className={classes}>
      {props.children}
    </div>
  );
};

export default FormGroup;
