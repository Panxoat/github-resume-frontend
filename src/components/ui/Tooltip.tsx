import clsx from "clsx";
import React from "react";

import "./Tooltip.css";

export const Tooltip = ({
  children,
  title,
  disabled,
}: {
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
}) => {
  return (
    <div
      className={clsx("tooltip", {
        "pointer-events-none": disabled,
      })}
    >
      {children}
      <span className="tooltiptext text-[15px]">{title}</span>
    </div>
  );
};
