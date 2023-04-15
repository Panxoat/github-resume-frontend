import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as CommitIcon } from "../assets/portfolio/commit_icon.svg";
import { ReactComponent as LanguageIcon } from "../assets/portfolio/language_icon.svg";

import { SummaryBox } from "../components/portfolio/summaryBox";

import type { IUserData } from "../types/portfolio";

export const Portfolio = () => {
  const location = useLocation();

  const { data } = useMemo(() => {
    if (location.state) {
      return location.state as IUserData;
    }

    return {
      data: null,
    };
  }, [location.state]);

  return (
    <>
      {!data && <div>loading...</div>}

      {data && (
        <article className="flex gap-x-[40px] px-[40px] py-[50px]">
          <aside>
            <Portfolio.Aside data={data} />
          </aside>

          <div className="w-full flex flex-col gap-y-[32px]">
            <Portfolio.Chart data={data} />
            <Portfolio.Summary data={data} />
            <Portfolio.LanguageSummary data={data} />
          </div>
        </article>
      )}
    </>
  );
};

Portfolio.Aside = ({ data }: IUserData) => {
  return (
    <>
      <section>
        <img
          className="w-[60px] h-[60px] rounded-full"
          src={data.user.imageUrl}
          alt="profileImage"
        />
        <p className="text-[#9DA2B9] text-[28px] font-bold">
          <span className="text-[#EC8D03]">{data.user.name}</span>
          's Portfolio
        </p>
      </section>

      <section className="flex flex-col gap-y-[11px] pt-[40px]">
        <p className="text-[#393D50] text-[16px]">Commit</p>

        <div className="flex items-center gap-x-[11px]">
          <div className="w-[36px] h-[36px] flex items-center justify-center rounded-[8px] bg-[#1A1B24]">
            <CommitIcon />
          </div>
          <span className="text-[#9DA2B9] text-[16px] font-bold">
            전체 커밋 카운트
          </span>
        </div>
        <div className="flex items-center gap-x-[11px]">
          <div className="w-[36px] h-[36px] flex items-center justify-center rounded-[8px] bg-[#1A1B24]">
            <LanguageIcon />
          </div>
          <span className="text-[#9DA2B9] text-[16px] font-bold">
            언어 별 점유율
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-y-[11px] pt-[40px]">
        <p className="text-[#393D50] text-[16px]">Project</p>

        {data.repositories.map((repo, repoIdx) => (
          <div className="flex items-center gap-x-[11px]" key={repoIdx}>
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#1A1B24]" />
            <span className="text-[#9DA2B9] text-[16px] font-bold">
              {repo.name}
            </span>
          </div>
        ))}
      </section>
    </>
  );
};

Portfolio.Chart = ({ data }: IUserData) => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between p-[40px] rounded-[12px] bg-[#1A1B24]">
        <div className="w-[40%] flex flex-col">
          <h1 className="text-[#ffffff] text-[28px] font-bold">
            {data.user.name}님의
            <br /> 최근 5개월 커밋 횟수
          </h1>
          <p className="text-[#393D50] text-[20px]">(22.4 ~ 22.12)</p>
          <p className="font-bold">
            <span className="text-[#39D353] text-[42px]">123</span>
            <span className="text-[#ffffff] text-[28px]">회</span>
          </p>
        </div>
        <div className="w-[60%] border border-[#e1e1e1]">차트 공간</div>
      </div>
    </section>
  );
};

Portfolio.Summary = ({ data }: IUserData) => {
  return (
    <div className="flex flex-wrap gap-y-[32px] gap-x-[30px]">
      <SummaryBox>
        <SummaryBox.Title>2023년 총 커밋 횟수</SummaryBox.Title>
        <SummaryBox.Content>
          <span className="text-[#39D353] text-[24px] font-bold">105</span>
          <span className="text-[#ffffff] text-[24px] font-bold">회</span>
        </SummaryBox.Content>
      </SummaryBox>

      <SummaryBox>
        <SummaryBox.Title>총 레포 개수</SummaryBox.Title>
        <SummaryBox.Content>
          <span className="text-[#39D353] text-[24px] font-bold">25</span>
          <span className="text-[#ffffff] text-[24px] font-bold">개</span>
        </SummaryBox.Content>
      </SummaryBox>

      <SummaryBox>
        <SummaryBox.Title>최다 사용 언어</SummaryBox.Title>
        <SummaryBox.Content>
          <span className="text-[#F7DF1E] text-[24px] font-bold">
            JavaScript
          </span>
        </SummaryBox.Content>
      </SummaryBox>

      <SummaryBox>
        <SummaryBox.Title>최다 커밋 레포</SummaryBox.Title>
        <SummaryBox.Content className="text-[#F7DF1E] text-[24px] font-bold  max-w-full truncate">
          Forestia-Front
        </SummaryBox.Content>
      </SummaryBox>
    </div>
  );
};

Portfolio.LanguageSummary = ({ data }: IUserData) => {
  return (
    <section className="w-full flex flex-col gap-y-[32px]">
      <div className="flex flex-col gap-y-[20px] p-[33px] rounded-[12px] bg-[#1A1B24]">
        <h1 className="text-[#ffffff] text-[24px] font-bold">언어 별 점유율</h1>

        <div className="flex justify-between">
          <aside className="max-h-[260px] overflow-auto">
            {data.languages.map((language, languageIdx) => (
              <div key={languageIdx} className="flex items-center gap-x-[5px]">
                <div className="w-[6px] h-[6px] bg-[#efefef]" />
                <p className="text-[20px] font-medium">
                  <span className="text-[#ffffff]">{language.name}</span>{" "}
                  <span className="text-[#9DA2B9]">{language.rate}%</span>
                </p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
};
