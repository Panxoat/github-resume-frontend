import { Outlet } from "react-router-dom";

export const Container = () => {
  return (
    <div className="w-screen h-screen bg-dark-200">
      <Outlet />
      {/* <footer className="w-full text-center pb-[40px]">
        <p className="text-[12px] text-[#393D50]">
          피드백 문의.{" "}
          <a className="cursor-pointer underline">seongbeom_lee@kakao.com</a> |
          © 2023 GitHub Resume 모든 권리 보유.
        </p>
      </footer> */}
    </div>
  );
};
