import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { ReactComponent as GithubLogo } from "../assets/github-mark.svg";

export const MainPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [id, setId] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  return (
    <div className="w-full h-full flex flex-col gap-y-[50px] justify-center items-center">
      <GithubLogo />
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            alert(id);
          }
        }}
        autoComplete="off"
        className="w-[200px] h-[40px] text-center outline-none rounded-[30px]"
      />
    </div>
  );
};
