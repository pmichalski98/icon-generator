import React, { type ComponentPropsWithoutRef } from "react";
import classNames from "classnames";

const FormLabel = (props: ComponentPropsWithoutRef<"label">) => {
  const styles = classNames("text-xl", props.className);
  return <label className={styles}>{props.children}</label>;
};

export default FormLabel;
