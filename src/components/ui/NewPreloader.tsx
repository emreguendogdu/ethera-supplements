import { animate, useAnimate } from "motion/react";
import { useEffect } from "react";

const Progressbar = () => {
  return (
    <div className="relative w-full h-2 bg-foreground/50 rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
      <div className="h-full w-[20%] bg-foreground rounded-full" />
    </div>
  );
};

export default function NewPreloader() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const enterAnimation = async () => {
      await animate(
        scope.current,
        {
          opacity: 1,
        },
        {
          duration: 0.25,
          ease: "easeInOut",
        }
      );
    };

    const textAnimation = async () => {
      await animate(scope.current, {
        opacity: 1,
      });
    };

    enterAnimation();
  }, []);

  return (
    <section
      id="new-preloader"
      className="fixed inset-0 h-svh w-full bg-background z-9999999 py-10 px-10 flex flex-col items-center justify-end opacity-0"
      ref={scope}
    >
      <div className="relative flex flex-col items-center justify-between w-full h-full">
        {/* Placeholder Div */}
        <div aria-hidden />
        {/* Big Text */}
        <span className="relative uppercase text-foreground -tracking-[0.01em] font-bold text-[4rem] font-display whitespace-nowrap">
          <Text1 />
          <Text2 />
          <Text3 />
        </span>

        {/* Progress Bar + Loading Text */}
        <div className="flex flex-col gap-2.5 items-center justify-center">
          <Progressbar />
          <p className="text-foreground/50 -tracking-[0.05em] font-bold font-display uppercase">
            Loading your experience...
          </p>
        </div>
      </div>
    </section>
  );
}

const SplitText = ({
  id,
  text,
  className,
}: {
  id: string;
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");

  return (
    <span
      id={id}
      className={`absolute -translate-x-1/2 top-0 opacity-0 ${className || ""}`}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block">
          {word}
          {index < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
};

const Text1 = () => (
  <SplitText id="preloader-text-1" text="Ethera Supplements" />
);

const Text2 = () => <SplitText id="preloader-text-2" text="Essentials only." />;

const Text3 = () => (
  <SplitText id="preloader-text-3" text="For maximum growth." />
);
