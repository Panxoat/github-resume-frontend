import { useEffect, useRef, useState } from "react";
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
      <input
        ref={inputRef}
        type="text"
        name="github_id"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
        autoComplete="off"
        className="w-[200px] h-[30px] text-center outline-none rounded"
      />
    </div>
  );
};
