export const HeroProductTeaser = () => {
  return (
    <div
      className="relative z-10 w-full min-h-[200svh] flex pt-[104px] sm:pt-[72px] px-sectionX-m md:px-sectionX py-5 text-white"
      id="products"
    >
      <div className="flex justify-center w-full sticky top-[104px] sm:top-[20svh] self-start">
        {/* Placeholder for empty left part */}
        {/* <div className="flex-1 hidden sm:block" aria-hidden /> */}

        {/* Products Content */}
        <div>
          {/* Title */}
          <div className="flex flex-col gap-2.5">
            <p className="font-bold leading-none -tracking-[0.02em] uppercase opacity-70 text-center">
              Zero Noise — Only Results.
            </p>

            <div className="relative flex flex-col">
              <h2 className="flex gap-10 uppercase">
                <span>[3]</span>
                <span>Essentials</span>
              </h2>

              <div className="w-full flex justify-end">
                <h2 className="uppercase flex gap-5">
                  <span>For</span> <span>growth.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


