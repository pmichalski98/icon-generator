import React, { ComponentPropsWithoutRef } from "react";
import { label } from "aws-sdk/clients/sns";
import classNames from "classnames";

const FormLabel = (props: ComponentPropsWithoutRef<"label">) => {
  const styles = classNames("text-xl", props.className);
  return <label className={styles}>{props.children}</label>;
};

export default FormLabel;
