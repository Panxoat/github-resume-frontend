export const PortfolioSkeleton = () => {
  return (
    <article className="[&>*]:animate-pulse [&>*]:bg-[#1c1c1c] w-full h-screen flex gap-x-[20px] tablet:gap-x-[40px] px-[40px] py-[50px]">
      <aside className="w-[20%] hidden tablet:block"></aside>

      <div className="w-full h-[200px] tablet:w-[80%] flex flex-col gap-y-[32px]">
        <div className="flex flex-wrap gap-y-[32px] gap-x-[30px]">
          <div className="flex-[1_0_20%] h-[113px] flex flex-col gap-y-[10px] justify-center rounded-[12px] bg-[#1A1B24] px-[30px]" />
        </div>
      </div>
    </article>
  );
};
