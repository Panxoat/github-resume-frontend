import { useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";

import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { ReactComponent as GithubLogo } from "../assets/landing/github-logo.svg";

import { ReactComponent as EmailIcon } from "../assets/portfolio/aside/email_icon.svg";
import { ReactComponent as CommitIcon } from "../assets/portfolio/aside/commit_icon.svg";
import { ReactComponent as LanguageIcon } from "../assets/portfolio/aside/language_icon.svg";
import { ReactComponent as ProjectIcon } from "../assets/portfolio/aside/project_icon.svg";

import { ReactComponent as ProjectBanner } from "../assets/portfolio/project/project_banner.svg";
import { ReactComponent as ForkIcon } from "../assets/portfolio/project/fork.svg";
import { ReactComponent as StarIcon } from "../assets/portfolio/project/star.svg";
import { ReactComponent as ArrowIcon } from "../assets/portfolio/project/arrow.svg";
import { ReactComponent as LinkIcon } from "../assets/portfolio/project/link.svg";
import { ReactComponent as NotFoundIcon } from "../assets/portfolio/project/not_found.svg";

import baseURL from "../api/axios";
import { useLanguageColor } from "../hooks/useLanguageColor";
import { useInvertColor } from "../hooks/useColor";

import { Tooltip } from "../components/ui/Tooltip";

import { Footer } from "../components/footer";
import { PortfolioSkeleton } from "../components/skeleton";
import { SummaryBox } from "../components/summary/summaryBox";
import { BarChart } from "../components/chart/barChart";
import { PieChart } from "../components/chart/pieChart";

import type { IUserData, ILanguages, IRepositories } from "../types/portfolio";
import { AxiosError } from "axios";

const screenVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 2,
    },
  },
};

const boxVariants = {
  ...screenVariants,
  hover: {
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
  const navigate = useNavigate();

  const { data } = useQuery<IUserData, AxiosError>(
    ["get_user_info", id],
    async () => {
      const response = await baseURL.get(`/github/user/${id}`);

      return response.data;
    },
    {
      enabled: !!id,
      retry: false,
      staleTime: 60000,
      onSuccess: (data) => {
        return {
          ...data,
          languages:
            data.languages.length > 0
              ? (data.languages as ILanguages[]).sort((a, b) => {
                  if (a.rate > b.rate) return -1;
                  if (a.rate < b.rate) return 1;
                  return 1;
                })
              : [],
        };
      },
      onError: (error) => {
        if (error.response?.status === 404) {
          navigate("/404");
        }
      },
    }
  );

  const scrollTargetRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLElement | null>(null);
  const shareRef = useRef<HTMLElement | null>(null);
  const projectRef = useRef<HTMLElement | null>(null);

  return (
    <>
      {!data && <PortfolioSkeleton />}

      {data && (
        <article className="w-full h-screen flex gap-x-[20px] px-[10px] pt-[20px] pb-[40px] tablet:gap-x-[20px] tablet:px-[30px] tablet:py-[40px] desktop:gap-x-[40px] desktop:px-[40px] desktop:py-[50px]">
          <aside className="w-[20%] hidden tablet:block">
            <Portfolio.Aside
              data={data}
              scrollRef={{
                scrollTarget: scrollTargetRef,
                overview: overviewRef,
                share: shareRef,
                project: projectRef,
              }}
            />
          </aside>

          <div
            ref={scrollTargetRef}
            className="overflow-auto w-full tablet:w-[80%] flex flex-col gap-y-[32px]"
          >
            <motion.article
              variants={screenVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              ref={shareRef}
            >
              <Portfolio.Summary data={data} />
            </motion.article>
            <motion.article
              variants={screenVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.45 }}
              ref={shareRef}
            >
              <Portfolio.Share data={data} />
            </motion.article>
            <motion.article
              variants={screenVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
              ref={projectRef}
            >
              <Portfolio.Project data={data} />
            </motion.article>
            <Footer className="relative" />
          </div>
        </article>
      )}
    </>
  );
};

Portfolio.Aside = ({
  data,
  scrollRef,
}: {
  data: IUserData;
  scrollRef: {
    scrollTarget: React.MutableRefObject<HTMLDivElement | null>;
    overview: React.MutableRefObject<HTMLElement | null>;
    share: React.MutableRefObject<HTMLElement | null>;
    project: React.MutableRefObject<HTMLElement | null>;
  };
}) => {
  const { id } = useParams();
  const { scrollTarget, share, project } = scrollRef;

  return (
    <>
      <section>
        <div
          className="group flex flex-col"
          onClick={() => {
            window.open(`https://github.com/${data.user.id}`, "_blank");
          }}
        >
          <Tooltip
            textClassName="!left-[60%] !bottom-[calc(100%-50px)]"
            title={
              <div className="flex items-center gap-x-[5px] px-[4px] py-[5px] text-[15px] text-[#D9D9D9] font-medium">
                <GithubLogo className="[&>path]:fill-[#D9D9D9]" />
                <span>GitHub로 이동</span>
              </div>
            }
          >
            <div className="flex items-center gap-x-[12px]">
              <img
                className="cursor-pointer w-[60px] h-[60px] rounded-full group-hover:scale-110 group-hover:shadow-[0px_0px_20px_1px_grey]"
                src={data.user.imageUrl}
                alt="profileImage"
              />
            </div>
            <p className="cursor-pointer tablet:text-[22px] dekstop:text-[28px] font-bold">
              <span className="group-hover:underline decoration-[#EC8D03] text-[#EC8D03]">
                {data.user.name || data.user.id}
              </span>
              <span className="group-hover:underline decoration-[#9DA2B9] text-[#9DA2B9]">
                's Portfolio
              </span>
            </p>
          </Tooltip>
          <p className="cursor-pointer group-hover:underline text-[14px] text-[#444859]">
            @{id}
          </p>
        </div>
        <p className="text-[16px] text-[#9DA2B9] font-medium pt-[17px]">
          {data.user.introduce}
        </p>

        <div className="flex items-center gap-x-[13px] pt-[25px]">
          <Tooltip
            title={`${
              data.user.contact.email
                ? data.user.contact.email
                : "이메일이 존재하지 않습니다"
            }`}
          >
            <a
              href={`mailto:${data.user.contact.email}`}
              className="disabled:pointer-events-none group w-[36px] flex items-center justify-center py-[10px] rounded-[8px] bg-[#1A1B24] hover:bg-[#9DA2B9]"
            >
              <EmailIcon className="group-hover:[&>path]:fill-[#000000]" />
            </a>
          </Tooltip>
          <Tooltip
            title={`${
              data.user.contact.websiteUrl
                ? data.user.contact.websiteUrl
                : "웹사이트가 존재하지 않습니다"
            }`}
          >
            <button
              className="disabled:pointer-events-none group w-[36px] flex items-center justify-center py-[10px] rounded-[8px] bg-[#1A1B24] hover:bg-[#9DA2B9]"
              onClick={() => {
                if (data.user.contact.websiteUrl) {
                  window.open(data.user.contact.websiteUrl, "_blank");
                }
              }}
            >
              <LinkIcon className="w-[16px] h-[16px] [&>path]:fill-[#9DA2B9] group-hover:[&>path]:fill-[#000000]" />
            </button>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-y-[11px] pt-[40px]">
        <p className="text-[#393D50] text-[16px]">Commit</p>

        <div className="flex items-center gap-x-[11px]">
          <div className="w-[36px] h-[36px] flex items-center justify-center rounded-[8px] bg-[#1A1B24]">
            <CommitIcon />
          </div>
          <span
            className="cursor-pointer text-[#9DA2B9] tablet:text-[13px] dekstop:text-[16px] font-bold hover:underline"
            onClick={() => {
              scrollTarget.current?.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            전체 커밋 카운트
          </span>
        </div>
        <div className="flex items-center gap-x-[11px]">
          <div className="w-[36px] h-[36px] flex items-center justify-center rounded-[8px] bg-[#1A1B24]">
            <LanguageIcon />
          </div>
          <span
            className="cursor-pointer text-[#9DA2B9] tablet:text-[13px] dekstop:text-[16px] font-bold hover:underline"
            onClick={() => {
              scrollTarget.current?.scroll({
                top: share.current?.offsetTop,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            언어 별 점유율
          </span>
        </div>
        <div className="flex items-center gap-x-[11px]">
          <div className="w-[36px] h-[36px] flex items-center justify-center rounded-[8px] bg-[#1A1B24]">
            <ProjectIcon />
          </div>
          <span
            className="cursor-pointer text-[#9DA2B9] tablet:text-[13px] dekstop:text-[16px] font-bold hover:underline"
            onClick={() => {
              scrollTarget.current?.scroll({
                top: project.current?.offsetTop,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            주요 프로젝트 목록
          </span>
        </div>
      </section>
    </>
  );
};

Portfolio.OverView = ({ data }: { data: IUserData }) => {
  const timeIndex = useMemo(() => {
    return data.contributions.monthlyContributionHistories.reduce(
      (acc: string[], curr) => [
        ...acc,
        `${curr.date.year}-${
          curr.date.month > 9 ? curr.date.month : `0${curr.date.month}`
        }`,
      ],
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
    <section className="  w-full">
      <motion.div
        variants={boxVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        whileHover="hover"
        className="flex flex-col tablet:flex-row justify-center items-center p-[40px] tablet:p-0 tablet:justify-between rounded-[12px] bg-[#1A1B24]"
      >
        <div className="w-full tablet:w-[40%] flex flex-col tablet:py-[40px] tablet:pl-[40px]">
          <h1 className="text-[#ffffff] text-[22px] tablet:text-[24px] desktop:text-[28px] font-bold">
            {data.user.name}님의
            <br /> 최근 {data.contributions.recentMonthRange}개월 활동 횟수
          </h1>
          <p className="text-[#393D50] text-[20px]">
            ({timeIndex[timeIndex.length - 1]} ~ {timeIndex[0]})
          </p>
          <p className="font-bold">
            <span className="text-[#39D353] text-[30px] tablet:text-[36px] desktop:text-[42px]">
              {accMeasure}
            </span>
            <span className="text-[#ffffff] text-[22px] tablet:text-[26px] desktop:text-[28px] pr-[10px]">
              회
            </span>
            <Tooltip title="커밋 + 코드리뷰 + PR + 이슈">
              <span className="cursor-default text-[#ffffff] font-medium">
                ⓘ
              </span>
            </Tooltip>
          </p>
        </div>
        <div className="w-full h-[200px] tablet:w-[60%] tablet:pl-[0px] tablet:pr-[40px]">
          <BarChart index={timeIndex} measure={measure} />
        </div>
      </motion.div>
    </section>
  );
};

Portfolio.Summary = ({ data }: { data: IUserData }) => {
  const mostUsageLanguage = useMemo(() => {
    if (data.languages.length > 0) {
      return (data.languages as ILanguages[]).reduce(
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
    }
  }, [data]);

  return (
    <section className="flex flex-wrap gap-[15px] tablet:gap-y-[32px] tablet:gap-x-[30px]">
      <Portfolio.OverView data={data} />
      <SummaryBox>
        <SummaryBox.Title>
          {data.contributions.year}년 총 커밋 횟수
        </SummaryBox.Title>
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
            {data.user.repositoryCount}
          </span>
          <span className="text-[#ffffff] text-[24px] font-bold">개</span>
        </SummaryBox.Content>
      </SummaryBox>

      <SummaryBox>
        <SummaryBox.Title>최다 사용 언어</SummaryBox.Title>
        <SummaryBox.Content>
          <span className="text-[#F7DF1E] text-[24px] font-bold">
            {mostUsageLanguage ? mostUsageLanguage.name : "없음"}
          </span>
        </SummaryBox.Content>
      </SummaryBox>

      <SummaryBox>
        <SummaryBox.Title>최근 커밋 레포</SummaryBox.Title>
        <SummaryBox.Content className="text-[#F7DF1E] text-[24px] font-bold  max-w-full truncate">
          {data.contributions.latestCommittedRepository
            ? data.contributions.latestCommittedRepository.name
            : "없음"}
        </SummaryBox.Content>
      </SummaryBox>
    </section>
  );
};

Portfolio.Share = ({ data }: { data: IUserData }) => {
  const { bgColor } = useLanguageColor();
  const { invertColor, brightenColor } = useInvertColor();

  const [first, second, third] = data.languages.slice(0, 3);

  return (
    <section className="pt-[20px] tablet:pt-[86px] desktop:pt-[106px] flex flex-col">
      <h1 className="text-[22px] tablet:text-[32px] desktop:text-32px] text-[#8EEFFF] text-center font-extrabold">
        <span className="text-[40px] tablet:text-[22px]">🌐</span>
        <br />
        언어 별 점유율
      </h1>
      <h2 className="w-full text-center text-[20px] text-[#9DA2B9] pt-[7px] tablet:pt-[14px]">
        어떤 언어를 가장 많이 사용할까요?
      </h2>

      <div className="w-full h-[600px] desktop:h-[500px] flex flex-col desktop:flex-row items-center gap-[14px] my-[80px]">
        {data.languages.length === 0 && (
          <div className="flex items-center justify-center w-full h-[60%] desktop:h-full py-[10px] dekstop:py-[30px] bg-[#1A1B24] rounded-[12px]">
            <div className="flex flex-col items-center gap-y-[30px]">
              <NotFoundIcon />
              <p className="text-[#9DA2B9]">아직 사용한 언어가 없어요.</p>
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <>
            <div className="w-full h-[60%] desktop:w-[70%] desktop:h-full py-[10px] dekstop:py-[30px] bg-[#1A1B24] rounded-[12px]">
              <PieChart data={data.languages.slice(0, 5)} />
            </div>

            <div className="w-full h-[30%] desktop:w-[30%] desktop:h-full flex flex-row desktop:flex-col items-center gap-x-[14px] gap-y-[10px]">
              {first && (
                <>
                  <div
                    style={{
                      color: invertColor(bgColor(first.name).color, true),
                      background: `linear-gradient(147.62deg, ${brightenColor(
                        bgColor(first.name).color,
                        10
                      )} 10.96%, ${brightenColor(
                        bgColor(first.name).color,
                        -30
                      )} 74.86%)`,
                    }}
                    className="w-full h-full flex flex-col px-[22px] py-[12px] dekstop:py-[22px] rounded-[12px]"
                  >
                    <p className="text-[20px] tablet:text-[24px] font-bold">
                      1위
                    </p>
                    <p className="truncate text-[20px] tablet:text-[24x] pt-[5px] font-semibold">
                      {first.name}
                    </p>
                    <p className="text-[20px]">{first.rate}%</p>
                  </div>

                  {second && third && (
                    <div className="w-full h-full flex flex-col gap-y-[10px]">
                      {[second, third].map((language, languageIdx) => (
                        <div
                          key={languageIdx}
                          style={{
                            color: invertColor(
                              bgColor(language?.name)?.color,
                              true
                            ),
                            background: `linear-gradient(147.62deg, ${brightenColor(
                              bgColor(language?.name)?.color,
                              10
                            )} 10.96%, ${brightenColor(
                              bgColor(language?.name)?.color,
                              -30
                            )} 74.86%)`,
                          }}
                          className="w-full h-[calc(50%-6px)] desktop:h-[50%] flex flex-col px-[22px] py-[12px] dekstop:py-[22px] rounded-[12px]"
                        >
                          <p className="text-[20px] font-bold">
                            {languageIdx + 2}위
                          </p>
                          <p className="truncate text-[18px] tablet:text-[20px] pt-[5px] font-semibold">
                            {language?.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

Portfolio.Project = ({ data }: { data: IUserData }) => {
  const { bgColor } = useLanguageColor();
  const { invertColor, brightenColor } = useInvertColor();

  const customRepositoriesData = useCallback(
    (
      sliceNum: number,
      repositories: IUserData["repositories"],
      recursiveResult?: IUserData["repositories"][]
    ): IUserData["repositories"][] => {
      if (recursiveResult?.length === 3) return recursiveResult || [];

      return customRepositoriesData(sliceNum + 2, repositories, [
        ...(recursiveResult || []),
        repositories.slice(sliceNum - 2, sliceNum),
      ]);
    },
    [data]
  );

  const dotStyle = "w-[19px] h-[19px] rounded-full bg-[#ffffff]";

  return (
    <section className="flex flex-col gap-y-[30px] pt-[20px] pb-[50px] tablet:pt-[100px]">
      <div className="flex w-full gap-x-[20px] justify-between rounded-[12px] bg-[#12BD8B]">
        <div className="flex flex-col justify-between pl-[20px] py-[20px]">
          <div
            style={{ boxShadow: "0px 4px 4px 2px #00000026" }}
            className={dotStyle}
          />
          <div
            style={{ boxShadow: "0px 4px 4px 2px #00000026" }}
            className={dotStyle}
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col py-[30px]">
            <h1 className="text-[20px] tablet:text-[36px] desktop:text-[48px] text-[#ffffff] font-bold leading-[57px]">
              주요 프로젝트
              <br className="hidden tablet:flex" /> 모음집.zip
            </h1>
            <p
              style={{ wordBreak: "keep-all", whiteSpace: "break-spaces" }}
              className="text-[18px] tablet:text-[20px] text-[#ffffff] font-extralight pt-[16px]"
            >
              평가에 도움될만한 레포를 모아봤어요!
            </p>
          </div>
          <ProjectBanner className="hidden tablet:flex" />
        </div>
        <div className="flex flex-col justify-between pr-[20px] py-[20px]">
          <div
            style={{ boxShadow: "0px 4px 4px 2px #00000026" }}
            className={dotStyle}
          />
          <div
            style={{ boxShadow: "0px 4px 4px 2px #00000026" }}
            className={dotStyle}
          />
        </div>
      </div>
      {data.repositories.length === 0 && (
        <div className="flex flex-col items-center gap-y-[30px] pt-[80px]">
          <NotFoundIcon />
          <p className="text-[#9DA2B9]">고정된 레포지토리가 없어요.</p>
        </div>
      )}
      {data.repositories.length > 0 && (
        <ul
          className="max-w-2xl grid grid-cols-1 desktop:grid-cols-3 tablet:max-w-none tablet:mt-20 mt-16 gap-8"
          role="list"
        >
          {customRepositoriesData(2, data.repositories as IRepositories[]).map(
            (repositories: IRepositories[], repositoriesIdx) => (
              <li key={repositoriesIdx}>
                <ul className="flex flex-col gap-y-6 tablet:gap-y-8">
                  {repositories.map((repositorie, repositorieIdx) => (
                    <li
                      key={repositorieIdx}
                      className="group rounded-[12px] overflow-hidden isolate"
                    >
                      <div
                        style={{
                          color: invertColor(
                            bgColor(repositorie.language)?.color || "#4C4C4C",
                            true
                          ),
                          background: `linear-gradient(147.62deg, ${brightenColor(
                            bgColor(repositorie.language)?.color || "#4C4C4C",
                            10
                          )} 10.96%, ${brightenColor(
                            bgColor(repositorie.language)?.color || "#4C4C4C",
                            -30
                          )} 74.86%)`,
                        }}
                        className="relative flex flex-col gap-y-[7px] px-[20px] pt-[20px] pb-[23px]"
                      >
                        <h2 className="text-[24px] font-bold">
                          {repositorie.name}
                        </h2>
                        <p className="text-[16px] font-medium">
                          {repositorie.description}
                        </p>

                        <button
                          onClick={() => {
                            window.open(repositorie.url, "_blank");
                          }}
                          type="button"
                          style={{ transition: "all 0.2s" }}
                          className="absolute bottom-[-25px] right-[25px] flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#393D50] hover:bg-[#9DA2B9]"
                        >
                          <ArrowIcon />
                        </button>
                      </div>

                      <div className="flex flex-col gap-y-[18px] bg-[#1A1B24] px-[20px] pt-[13px] pb-[17px]">
                        <div className="flex items-center gap-x-[18px]">
                          <div className="flex items-center gap-x-[6px]">
                            <ForkIcon />
                            <span className="text-[13px] text-[#9DA2B9]">
                              {repositorie.forkCount}
                            </span>
                          </div>
                          <div className="flex items-center gap-x-[6px]">
                            <StarIcon />
                            <span className="text-[13px] text-[#9DA2B9]">
                              {repositorie.starCount}
                            </span>
                          </div>
                        </div>
                        {repositorie.topics.length > 0 && (
                          <div className="flex flex-wrap gap-x-[5px] gap-y-[8px]">
                            {repositorie.topics.map((topic, topicIdx) => (
                              <div
                                key={topicIdx}
                                className="flex items-center justify-center px-[13px] py-[3px] text-[12px] text-[#39D353] rounded-[15px] bg-[#393D50]"
                              >
                                # {topic}
                              </div>
                            ))}
                          </div>
                        )}

                        {repositorie.homepageUrl && (
                          <div
                            style={{ transition: "all 0.3s" }}
                            className="h-0 p-0 group-hover:h-auto group-hover:px-[13px] group-hover:py-[8px] cursor-pointer group flex items-center gap-x-[11px] text-[12px] text-[#39D353] rounded-[15px] bg-[#393D50]"
                          >
                            <LinkIcon className="h-0 group-hover:h-auto" />
                            <a
                              href={repositorie.homepageUrl}
                              rel="noreferrer"
                              target="_blank"
                              className="hidden group-hover:block truncate text-[12px] text-[#FFFFFF] font-medium hover:underline"
                            >
                              {repositorie.homepageUrl}
                            </a>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
};
