import { ReactComponent as Symbol } from "../assets/landing/symbol.svg";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <article className="h-screen flex flex-col gap-y-[35px] items-center justify-center bg-dark-200">
      <p className="text-[18px] text-[#666666] font-semibold">GitHub Resume</p>
      <section>
        <div className="w-[580px] flex flex-col items-center py-[34px] rounded-[12px] bg-[#D9D9D9] overflow-hidden">
          <h1 className="text-[40px] text-[#393D50] font-bold">
            404 없는 페이지입니다 :(
          </h1>
          <h2 className="text-[18px] text-[#393D50] font-medium">
            페이지가 이동되었거나 없는 사용자의 프로필을 검색했을 수 있습니다.
          </h2>
          <Symbol className="my-[37px]" />
          <button
            className="w-[211px] py-[10px] bg-[#393D50] hover:bg-[#4a4b52] rounded-[23px] text-[16px] text-[#D9D9D9] font-medium"
            onClick={() => {
              navigate("/");
            }}
          >
            메인으로
          </button>
        </div>
      </section>
    </article>
  );
};
