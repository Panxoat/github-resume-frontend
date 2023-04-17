import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";

import baseURL from "../api/axios";

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

  const { mutate } = useMutation<any, any, string>(
    ["get_user_info"],
    async (userId) => {
      const response = await baseURL.get(`/github/user/${userId}`);

      return response.data;
    },
    {
      onSuccess: (data) => {
        navigate("portfolio", {
          state: {
            data,
          },
        });
      },
    }
  );

  const onSubmit = () => {
    mutate(id);
  };

  return (
    <div className="w-full h-screen flex flex-col gap-y-[50px] justify-center items-center">
      <GithubLogo />
      <form
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
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     onSubmit();
          //   }
          // }}
          autoComplete="off"
          className="w-[200px] h-[40px] text-center outline-none rounded-[30px]"
        />
      </form>
    </div>
  );
};
