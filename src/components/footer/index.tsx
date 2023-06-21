import { twMerge } from "tailwind-merge";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={twMerge(
        "bottom-[0px] left-[50%] translate-x-[-50%] w-full text-center",
        className
      )}
    >
      <p className="text-[12px] text-[#393D50]">
        피드백 문의.{" "}
        <a className="cursor-pointer underline">seongbeom_lee@kakao.com</a> | ©
        2023 GitHub Resume 모든 권리 보유.
      </p>
    </footer>
  );
};
