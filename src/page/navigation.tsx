import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "@assets/logo.svg";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 w-full flex h-[56px] px-[15px] desktop:px-[40px]">
      <button
        className="flex items-center gap-x-1"
        onClick={() => {
          navigate("/");
        }}
      >
        <Logo className="w-[20px] h-[20px]" />
        <h1 className="text-[20px] text-[#ffffff] font-semibold">
          GitHub Resume
        </h1>
      </button>
    </div>
  );
};
