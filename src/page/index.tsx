import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { ReactComponent as GithubLogo } from "../assets/github-mark.svg";

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
    <div className="w-full h-screen flex flex-col gap-y-[50px] justify-center items-center">
      <GithubLogo />
      <form
        className="flex items-center gap-x-[10px]"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <motion.input
          whileHover={{ scale: 1.2 }}
          ref={inputRef}
          type="text"
          name="github_id"
          placeholder="Enter your Github ID"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          autoComplete="off"
          className="w-[200px] h-[40px] text-center outline-none rounded-[30px]"
        />
        <button
          type="submit"
          className="px-[10px] h-[40px] bg-[#ffffff] rounded-[20px]"
        >
          Go
        </button>
      </form>
    </div>
  );
};
