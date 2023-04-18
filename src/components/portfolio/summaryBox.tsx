import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ISummaryBox {
  children?: React.ReactNode;
  className?: string;
}

const boxVariants = {
  hover: {
    boxShadow: "0px 0px 10px 5px #6AD77C80",
    scale: 1.002,
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const SummaryBox = ({ children, className }: ISummaryBox) => {
  return (
    <motion.div
      variants={boxVariants}
      initial="start"
      animate="end"
      whileHover="hover"
      className={twMerge(
        "cursor-pointer flex-[1_0_20%] h-[113px] flex flex-col gap-y-[10px] justify-center rounded-[12px] bg-[#1A1B24] px-[30px]",
        className
      )}
    >
      {children}
    </motion.div>
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
