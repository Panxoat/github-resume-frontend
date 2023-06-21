import clsx from "clsx";
import React from "react";

import { ReactComponent as ErrorIcon } from "../../assets/landing/error_icon.svg";

interface ISnackBar {
  type?: "ERROR" | "SUCCESS" | "INFO";
  content?: React.ReactNode | string;
  className?: string;
}

const root =
  "absolute flex items-center gap-x-[16px] px-[25px] py-[16px] rounded-[20px]";

export const SnackBar = ({ type, content, className }: ISnackBar) => {
  return (
    <div className={clsx(root, className)}>
      {type === "ERROR" && <ErrorIcon />}
      <p>{content}</p>
    </div>
  );
};
