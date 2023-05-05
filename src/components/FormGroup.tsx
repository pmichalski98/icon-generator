import React, { ComponentPropsWithRef } from "react";

const FormGroup = (props: ComponentPropsWithRef<"div">) => {
  return (
    <div {...props} className="flex flex-col gap-1">
      {props.children}
    </div>
  );
};

export default FormGroup;
