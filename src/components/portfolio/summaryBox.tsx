import React from "react";
import { twMerge } from "tailwind-merge";

interface ISummaryBox {
  children?: React.ReactNode;
  className?: string;
}

const SummaryBox = ({ children, className }: ISummaryBox) => {
  return (
    <div
      className={twMerge(
        "flex-[1_0_20%] h-[113px] flex flex-col gap-y-[10px] justify-center rounded-[12px] bg-[#1A1B24] px-[30px]",
        className
      )}
    >
      {children}
    </div>
  );
};

SummaryBox.Title = ({ children, className }: ISummaryBox) => {
  return (
    <h3
      className={twMerge("text-[#ffffff] text-[12px] font-medium", className)}
    >
      {children}
    </h3>
  );
};

SummaryBox.Content = ({ children, className }: ISummaryBox) => {
  return (
    <p className={twMerge("text-[24px] font-bold", className)}>{children}</p>
  );
};

export { SummaryBox };
