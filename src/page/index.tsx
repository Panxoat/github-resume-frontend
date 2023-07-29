import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";

import { ReactComponent as Symbol } from "../assets/landing/symbol.svg";
import { ReactComponent as GithubLogo } from "../assets/landing/github-logo.svg";
import { ReactComponent as ArrowIcon } from "../assets/landing/arrow.svg";
import { ReactComponent as XIcon } from "../assets/landing/not_found_icon.svg";
import { ReactComponent as HistoryIcon } from "../assets/landing/history_icon.svg";

import baseURL from "../api/axios";

import { Footer } from "../components/footer";
import { Spinner } from "../components/ui/Spinner";
import { SnackBar } from "../components/ui/SnackBar";
import { AxiosError } from "axios";

const VALID_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const landingVariants = {
  initial: {
    transform: "translate(0px, -50px)",
    opacity: 0,
    filter: "blur(10px)",
  },
  animate: {
    transform: "translate(0px, 0px)",
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    transform: "translate(0px, -50px)",
    opacity: 0,
    filter: "blur(10px)",
  },
};

export const MainPage = () => {
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [id, setId] = useState("");
  const [isInvalidId, setIsInvalidId] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);

  const cachedSearchHistory: string[] = useMemo(() => {
    const data = window.localStorage.getItem("searchHistory");

    if (data) {
      return JSON.parse(data) as string[];
    }
    return [];
  }, [window.localStorage.getItem("searchHistory")]);

  const [historyList, setHistoryList] = useState(cachedSearchHistory);

  useEffect(() => {
    window.localStorage.setItem("searchHistory", JSON.stringify(historyList));
  }, [historyList]);

  useEffect(() => {
    const callback = (event: Event) => {
      const el = formRef.current;

      if (!event || !el || el.contains((event as any).target)) return;
      setIsInputFocus(false);
    };

    document.addEventListener("click", callback);

    return () => document.removeEventListener("click", callback);
  }, [formRef, formRef.current]);

  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const { mutate, isLoading, error, reset } = useMutation<
    unknown,
    AxiosError,
    string
  >(
    ["get_user_info"],
    async (id) => {
      const response = await baseURL.get(`/github/user/${id}`);

      return response.data;
    },
    {
      onSuccess: () => {
        const distinctedHistory = [...new Set([...cachedSearchHistory, id])];

        window.localStorage.setItem(
          "searchHistory",
          JSON.stringify(distinctedHistory)
        );
        navigate(`/${id}`);
      },
      onError: (error) => {
        return error;
      },
    }
  );

  const onDeleteHistory = useCallback(
    (name: string) => {
      setHistoryList(historyList.filter((history) => history !== name));
    },
    [historyList]
  );

  const escapeRegex = (pattern: string) => {
    return pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const autocompleteMatch = useMemo(() => {
    if (id === "" && historyList) {
      return historyList;
    }

    const reg = escapeRegex(id);

    return historyList.filter(function (term) {
      if (id.search(reg) !== -1) {
        return term;
      }
    });
  }, [id, historyList]);

  const notFoundUser = useMemo(() => {
    if (error) {
      return error.response?.status === 404;
    }

    return false;
  }, [error]);

  return (
    <>
      <article
        style={{
          height: "calc(var(--vh, 1vh) * 100)",
        }}
        className="w-full max-w-[1440px] mx-auto flex flex-col justify-center gap-y-[40px] tablet:gap-y-[100px] px-[30px] tablet:px-[70px] overflow-hidden"
      >
        <motion.p
          initial="initial"
          animate="animate"
          variants={landingVariants}
          transition={{ duration: 0.8, repeat: 0 }}
          className="text-[18px] text-[#666666] font-semibold"
        >
          GitHub Resume
        </motion.p>

        <section className="flex flex-col desktop:flex-row gap-y-[30px] tablet:gap-y-[100px] desktop:items-center justify-between">
          <motion.div
            initial="initial"
            animate="animate"
            variants={landingVariants}
            transition={{ duration: 0.8, repeat: 0 }}
            className="flex flex-col gap-y-[30px]"
          >
            <h1 className="text-[32px] tablet:text-[45px] text-[#ffffff] font-semibold">
              개발자의 GitHub
            </h1>
            <Symbol className="w-full h-full tablet:w-fit" />
            <h1 className="text-[32px] tablet:text-[45px] text-[#ffffff] font-semibold">
              간편 요약으로
              <br />한 눈에 확인.
            </h1>
          </motion.div>

          <div className="relative flex flex-col gap-y-[5px]">
            <div className="absolute top-[-30px]">
              <>
                {isInvalidId && (
                  <p className="text-[#d32f2f]">
                    올바르지 않은 GitHub ID 입니다.
                  </p>
                )}
                {notFoundUser && (
                  <p className="text-[#d32f2f]">유저를 찾을 수 없습니다.</p>
                )}
              </>
            </div>

            <motion.form
              ref={formRef}
              animate={
                notFoundUser || isInvalidId
                  ? {
                      marginRight: [0, 10, -10, 0],
                    }
                  : {}
              }
              transition={{
                duration: 0.3,
                times: [0, 1],
              }}
              style={{ boxShadow: "0px 4px 10px 0px #00000040 inset" }}
              className="relative flex flex-col desktop:w-[444px] tablet:w-full "
              onSubmit={(e) => {
                window.scrollTo({ left: 0, top: 0 });
                e.preventDefault();

                if (id.match(VALID_USERNAME_REGEX) === null) {
                  setIsInvalidId(true);
                } else {
                  mutate(id);
                }
              }}
            >
              <div
                className={clsx(
                  "flex items-center justify-between desktop:w-[444px] tablet:w-full rounded-[46px] px-[21px] py-[11px] bg-[#ffffff]",
                  {
                    "rounded-none rounded-tl-[11px] rounded-tr-[11px]":
                      historyList.length > 0 && isInputFocus,
                  }
                )}
              >
                <div className="flex w-full gap-x-[6px] items-center">
                  <GithubLogo />
                  <input
                    ref={inputRef}
                    value={id}
                    onFocus={() => {
                      setIsInputFocus(true);
                    }}
                    onChange={(e) => {
                      if (notFoundUser) {
                        reset();
                      }
                      setIsInvalidId(false);
                      setId(e.target.value.trim());
                    }}
                    type="text"
                    placeholder="GitHub ID 입력"
                    className={clsx("w-full outline-none", {
                      "text-[#CD0000]": notFoundUser || isInvalidId,
                    })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!id}
                  className={clsx(
                    "flex flex-shrink-0 items-center justify-center w-[31px] h-[31px] rounded-full bg-[#393D50]",
                    {
                      "bg-[#CD0000]": notFoundUser || isInvalidId,
                    }
                  )}
                >
                  {error ? (
                    <>{notFoundUser && <XIcon />}</>
                  ) : isLoading ? (
                    <Spinner />
                  ) : (
                    <ArrowIcon />
                  )}
                </button>

                {historyList.length > 0 && isInputFocus && (
                  <div className="absolute overflow-hidden left-0 top-[53px] w-full max-h-[250px] flex flex-col desktop:w-[444px] rounded-bl-[11px] rounded-br-[11px] tablet:w-full bg-[#ffffff] pb-[10px]">
                    {autocompleteMatch.map((history, idx) => (
                      <div className="cursor-pointer flex items-center justify-between px-[21px] hover:bg-[#efefef]">
                        <div
                          role="button"
                          key={idx}
                          className="flex w-full items-center gap-x-[10px] py-[11px] "
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/${history}`);
                          }}
                        >
                          <HistoryIcon width={18} className="mt-[2px]" />
                          <p>{history}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onDeleteHistory(history);
                          }}
                          className="rounded-full p-[6px] hover:bg-[#d2d2d2]"
                        >
                          <XIcon className="w-[10px] h-[10px] [&>path]:fill-[#424242] " />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.form>
          </div>
        </section>

        {String(error?.response?.status).startsWith("5") && (
          <div className="relative">
            <SnackBar
              type="ERROR"
              content={
                <p className="text-[16px] text-[#ffffff] font-semibold">
                  서버 응답이 없습니다. 잠시 후 시도해주세요
                </p>
              }
              className="bg-[#CE4F50] left-[50%] translate-x-[-50%]"
            />
          </div>
        )}

        <div className="hidden tablet:flex">
          <Footer className="absolute pb-[40px]" />
        </div>
      </article>
    </>
  );
};
