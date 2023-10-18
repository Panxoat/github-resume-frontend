export const PortfolioSkeleton = () => {
  return (
    <article className="w-full h-screen flex gap-x-[20px] tablet:gap-x-[40px] px-[40px] py-[50px]">
      <aside className="animate-pulse bg-[#1c1c1c] w-[20%] hidden tablet:block"></aside>

      <div className="w-full flex flex-col gap-[15px] tablet:gap-y-[32px] tablet:gap-x-[30px]">
        <div className="animate-pulse bg-[#1c1c1c] w-full h-[257px]" />
        <div className="w-full flex items-center gap-x-[30px]">
          <div className="animate-pulse bg-[#1c1c1c] flex-[1_0_20%] h-[113px] rounded-[12px] px-[15px] tablet:px-[30px]" />
          <div className="animate-pulse bg-[#1c1c1c] flex-[1_0_20%] h-[113px] rounded-[12px] px-[15px] tablet:px-[30px]" />
          <div className="animate-pulse bg-[#1c1c1c] flex-[1_0_20%] h-[113px] rounded-[12px] px-[15px] tablet:px-[30px]" />
          <div className="animate-pulse bg-[#1c1c1c] flex-[1_0_20%] h-[113px] rounded-[12px] px-[15px] tablet:px-[30px]" />
        </div>
        <div className="w-full flex items-center gap-x-[30px]">
          <div className="animate-pulse bg-[#1c1c1c] flex-[1_0_40%] h-[113px] rounded-[12px] px-[15px] tablet:px-[30px]" />
          <div className="animate-pulse bg-[#1c1c1c] flex-[1_0_40%] h-[113px] rounded-[12px] px-[15px] tablet:px-[30px]" />
        </div>
        <div className="animate-pulse bg-[#1c1c1c] w-full h-[calc(100vh-670px)] rounded-[12px]" />
      </div>
    </article>
  );
};
