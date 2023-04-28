import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { ReactComponent as Symbol } from "../assets/symbol.svg";
import { ReactComponent as GithubLogo } from "../assets/github-logo.svg";
import { ReactComponent as ArrowIcon } from "../assets/arrow.svg";

const landingVariants = {
  initial: {
    transform: "translate(0px, -50px)",
    opacity: 0,
    filter: "blur(10px)",
  },
  animate: {
    transform: "translate(0px, 0px)",
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    transform: "translate(0px, -50px)",
    opacity: 0,
    filter: "blur(10px)",
  },
};

export const MainPage = () => {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [id, setId] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const onSubmit = () => {
    navigate(`/${id}`);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto h-screen flex flex-col justify-center gap-y-[103px] px-[70px] py-[76px]">
      <motion.p
        initial="initial"
        animate="animate"
        variants={landingVariants}
        transition={{ duration: 0.8, repeat: 0 }}
        className="text-[18px] text-[#666666] font-semibold"
      >
        Github Resume
      </motion.p>

      <section className="flex tablet:flex-col desktop:flex-row tablet:gap-y-[100px] desktop:items-center justify-between">
        <motion.div
          initial="initial"
          animate="animate"
          variants={landingVariants}
          transition={{ duration: 0.8, repeat: 0 }}
          className="flex flex-col gap-y-[30px]"
        >
          <h1 className="text-[45px] text-[#ffffff] font-semibold">
            확인이 번거로운
            <br />
            지원자의 GitHub를
          </h1>
          <Symbol />
          <h1 className="text-[45px] text-[#ffffff] font-semibold">
            간편 요약으로
            <br />한 눈에 확인.
          </h1>
        </motion.div>

        <form
          style={{ boxShadow: "0px 4px 10px 0px #00000040 inset" }}
          className="flex justify-between desktop:w-[444px] tablet:w-full rounded-[46px] px-[21px] py-[11px] bg-[#ffffff]"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="flex w-full gap-x-[6px] items-center">
            <GithubLogo />
            <input
              ref={inputRef}
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              type="text"
              placeholder="GitHub ID 입력"
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-[31px] h-[31px] rounded-full bg-[#393D50]"
          >
            <ArrowIcon />
          </button>
        </form>
      </section>
    </div>
  );
};
