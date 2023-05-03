import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

import "./Tooltip.css";

interface TooltipProps {
  textClassName?: string;
  rootClassName?: string;
  children: React.ReactNode;
  title: React.ReactNode | string;
  disabled?: boolean;
}

export const Tooltip = ({
  textClassName,
  rootClassName,
  children,
  title,
  disabled,
}: TooltipProps) => {
  return (
    <div
      className={twMerge(
        clsx("tooltip ", {
          "pointer-events-none": disabled,
        }),
        rootClassName
      )}
    >
      {children}
      <span className={twMerge("tooltiptext text-[15px]", textClassName)}>
        {title}
      </span>
    </div>
  );
};
