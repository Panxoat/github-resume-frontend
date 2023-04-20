import { motion } from "framer-motion";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ReactComponent as CommitIcon } from "../assets/portfolio/commit_icon.svg";
import { ReactComponent as LanguageIcon } from "../assets/portfolio/language_icon.svg";

import baseURL from "../api/axios";

import { PortfolioSkeleton } from "../components/skeleton";
import { SummaryBox } from "../components/portfolio/summaryBox";
import { LineChart } from "../components/chart/lineChart";

import type { IUserData } from "../types/portfolio";
import { useMemo } from "react";

const boxVariants = {
  hover: {
    boxShadow: "0px 0px 15px 5px #6AD77C80",
    scale: 1.002,
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeOut",
    },
  },
};

export const Portfolio = () => {
  const { id } = useParams();

  const { data } = useQuery<IUserData, string>(
    ["get_user_info"],
    async () => {
      const response = await baseURL.get(`/github/user/${id}`);

      return response.data;
    },
    {
      enabled: !!id,
      staleTime: 60000,
      onError: (error) => {
        alert(error);
      },
    }
  );

  return (
    <>
      {!data && <PortfolioSkeleton />}

      {data && (
        <article className="w-full h-screen flex gap-x-[20px] tablet:gap-x-[40px] px-[40px] py-[50px]">
          <aside className="p-3 w-[20%] hidden tablet:block">
            <Portfolio.Aside data={data} />
          </aside>

          <div className="overflow-auto p-3 w-full tablet:w-[80%] flex flex-col gap-y-[32px]">
            <Portfolio.OverView data={data} />
            <Portfolio.Summary data={data} />
            {/* <Portfolio.LanguageSummary data={data} /> */}
            <Portfolio.Share data={data} />
          </div>
        </article>
      )}
    </>
  );
};

Portfolio.Aside = ({ data }: { data: IUserData }) => {
  const { id } = useParams();

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
        <p className="text-[14px] text-[#444859]">@{id}</p>
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

Portfolio.OverView = ({ data }: { data: IUserData }) => {
  const timeIndex = useMemo(() => {
    return data.contributions.monthlyContributionHistories.reduce(
      (acc: string[], curr) => [...acc, `${curr.date.year}-${curr.date.month}`],
      []
    );
  }, [data]);

  const measure = useMemo(
    () =>
      data.contributions.monthlyContributionHistories.map(
        (history) => history.contributionCount
      ),
    [data]
  );

  const accMeasure = measure.reduce((acc, curr) => acc + curr, 0);

  return (
    <section className="cursor-pointer w-full">
      <motion.div
        variants={boxVariants}
        initial="start"
        animate="end"
        whileHover="hover"
        className="flex flex-col tablet:flex-row justify-center items-center tablet:justify-between p-[40px] rounded-[12px] bg-[#1A1B24]"
      >
        <div className="w-full tablet:w-[40%] flex flex-col">
          <h1 className="text-[#ffffff] text-[22px] tablet:text-[24px] desktop:text-[28px] font-bold">
            {data.user.name}님의
            <br /> 최근 {data.contributions.recentMonthRange}개월 커밋 횟수
          </h1>
          <p className="text-[#393D50] text-[20px]">
            ({timeIndex[timeIndex.length - 1]} ~ {timeIndex[0]})
          </p>
          <p className="font-bold">
            <span className="text-[#39D353] text-[30px] tablet:text-[36px] desktop:text-[42px]">
              {accMeasure}
            </span>
            <span className="text-[#ffffff] text-[22px] tablet:text-[26px] desktop:text-[28px]">
              회
            </span>
          </p>
        </div>
        <div className="w-full h-full tablet:w-[60%]">
          <LineChart index={timeIndex} measure={measure} />
        </div>
      </motion.div>
    </section>
  );
};

Portfolio.Summary = ({ data }: { data: IUserData }) => {
  const mostUsageLanguage = useMemo(() => {
    return data.languages.reduce(
      (acc, curr) => {
        if (acc.rate < curr.rate) {
          acc = {
            rate: curr.rate,
            name: curr.name,
          };
        }
        return acc;
      },
      {
        rate: 0,
        name: "",
      }
    );
  }, [data]);

  return (
    <div className="flex flex-wrap gap-y-[32px] gap-x-[30px]">
      <SummaryBox>
        <SummaryBox.Title>2023년 총 커밋 횟수</SummaryBox.Title>
        <SummaryBox.Content>
          <span className="text-[#39D353] text-[24px] font-bold">
            {data.contributions.commitCount}
          </span>
          <span className="text-[#ffffff] text-[24px] font-bold">회</span>
        </SummaryBox.Content>
      </SummaryBox>

      <SummaryBox>
        <SummaryBox.Title>총 레포지토리 개수</SummaryBox.Title>
        <SummaryBox.Content>
          <span className="text-[#39D353] text-[24px] font-bold">
            {data.repositories.length}
          </span>
          <span className="text-[#ffffff] text-[24px] font-bold">개</span>
        </SummaryBox.Content>
      </SummaryBox>

      <SummaryBox>
        <SummaryBox.Title>최다 사용 언어</SummaryBox.Title>
        <SummaryBox.Content>
          <span className="text-[#F7DF1E] text-[24px] font-bold">
            {mostUsageLanguage.name}
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

Portfolio.LanguageSummary = ({ data }: { data: IUserData }) => {
  return (
    <section className="w-full flex flex-col gap-y-[32px]">
      <div className="flex flex-col gap-y-[20px] p-[33px] rounded-[12px] bg-[#1A1B24]">
        <h1 className="text-[#ffffff] text-[24px] font-bold">언어 별 점유율</h1>

        <div className="flex flex-col tablet:flex-row justify-between">
          <aside className="w-full talbet:w-[40%] overflow-auto">
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

          <div className="w-full tablet:w-[60%]">
            {/* <PieChart data={data.languages} /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

Portfolio.Share = ({ data }: { data: IUserData }) => {
  return (
    <section className="mobile:pt-[66px] tablet:pt-[86px] desktop:pt-[106px] flex flex-col items-center">
      <h1 className="mobile:text-[22px] tablet:text-[32px] desktop:text-32px] text-[#8EEFFF] text-center font-extrabold">
        🌐
        <br />
        언어 별 점유율
      </h1>
      <h2 className="text-[20px] text-[#9DA2B9] pt-[14px]">
        어떤 언어를 가장 많이 사용할까요?
      </h2>
    </section>
  );
};
