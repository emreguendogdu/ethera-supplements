"use client";

import useDeviceSize from "@/hooks/useDeviceSize";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useLoadingStore } from "@/stores/loadingStore";
import { useScrollContext } from "@/context/ScrollContext";
import "./Preloader.css";
import { splitTextElements } from "@/utils/splitTextElements";

gsap.registerPlugin(SplitText, CustomEase);

CustomEase.create("hop", ".8, 0, .3, 1");

// Check if preloader should be skipped (for development)
const shouldSkipPreloader = () => {
  if (typeof window === "undefined") return false;
  try {
    // Check environment variable (must be set at build time for client components)
    if (process.env.NEXT_PUBLIC_SKIP_PRELOADER === "true") return true;
    // Check localStorage (useful for toggling during development)
    const skipFlag = localStorage.getItem("skipPreloader");
    if (skipFlag === "true") return true;
  } catch (e) {
    // localStorage might not be available in some contexts
    console.warn("Could not check skipPreloader flag:", e);
  }
  return false;
};

export default function Preloader() {
  // Call all hooks first (React rules)
  const { setAllowScroll } = useScrollContext();
  const { setPreloaderAnimationComplete, setAllAssetsLoaded } = useLoadingStore(
    (state) => state.actions
  );
  const { isMobile } = useDeviceSize();
  const [splitTextReady, setSplitTextReady] = useState(false);
  const allAssetsLoaded = useLoadingStore((state) => state.allAssetsLoaded);
  // Always start as false to match server render (prevents hydration mismatch)
  const [isHidden, setIsHidden] = useState(false);
  const [shouldSkip, setShouldSkip] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const timelineCreatedRef = useRef(false);

  // Check skip condition after mount (prevents hydration mismatch)
  // Use useLayoutEffect to run synchronously before paint
  useLayoutEffect(() => {
    const skip = shouldSkipPreloader();
    setShouldSkip(skip);

    if (skip) {
      // Immediately set all required states so animations can run
      setPreloaderAnimationComplete();
      setAllAssetsLoaded();
      setAllowScroll(true);
      setIsHidden(true);
    }
  }, [setPreloaderAnimationComplete, setAllAssetsLoaded, setAllowScroll]);

  useEffect(() => {
    if (typeof document === "undefined" || shouldSkip || isHidden) return;

    const timer = setTimeout(() => {
      splitTextElements(".preloader .intro-title span", "words, chars", true);
      splitTextElements(".tag p", "words");
      setSplitTextReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [shouldSkip, isHidden]);

  useEffect(() => {
    if (shouldSkip || isHidden) return;

    if (allAssetsLoaded) {
      setAllowScroll(true);
      // Resume timeline if it's paused at waitForAssets
      if (timelineRef.current && timelineRef.current.paused()) {
        timelineRef.current.resume();
      }
    } else {
      setAllowScroll(false);
      setIsHidden(false);
    }
  }, [allAssetsLoaded, setAllowScroll, shouldSkip, isHidden]);

  useGSAP(
    () => {
      if (
        typeof window === "undefined" ||
        !splitTextReady ||
        shouldSkip ||
        isHidden
      )
        return;

      // Prevent timeline from being recreated
      if (timelineCreatedRef.current) return;
      timelineCreatedRef.current = true;

      const introWords = gsap.utils.toArray(
        ".preloader .intro-title .word"
      ) as HTMLElement[];
      const etheraWord = introWords[0];
      const supplementsWord = introWords[1];

      gsap.set(".preloader .intro-title .char span", {
        y: "-100%",
      });

      gsap.set(".block-1", {
        y: 0,
      });
      gsap.set(".block-2", {
        y: 0,
      });

      const tl = gsap.timeline({ defaults: { ease: "hop" } });
      const tags = gsap.utils.toArray(".tags-overlay .tag");

      // Initial tag animations
      tags.forEach((tag, index) => {
        tl.to(
          (tag as HTMLElement).querySelectorAll("p .word"),
          {
            y: "0%",
            duration: 0.75,
          },
          index > 0 ? 0.7 : 0.6
        );
      });

      // Title animation
      tl.to(
        ".preloader .intro-title .char span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
        },
        0.5
      )
        // Supplements word exit
        .to(
          supplementsWord?.querySelectorAll(".char span") || [],
          {
            y: "100%",
            duration: 0.75,
            stagger: 0.05,
          },
          2
        )
        // Ethera word slide
        .to(
          etheraWord?.querySelectorAll(".char") || [],
          {
            left: "100%",
            duration: 1.5,
          },
          2
        )
        // Hide supplements word
        .set(
          supplementsWord,
          {
            opacity: 0,
            pointerEvents: "none",
          },
          3.3
        )
        // Add label for waiting point - animation will pause here until assets load
        .addLabel("waitForAssets", 3.3)
        // Always pause here - will be resumed when assets load
        .call(
          () => {
            // Get current value from store, not closure
            const currentAssetsLoaded =
              useLoadingStore.getState().allAssetsLoaded;
            if (!currentAssetsLoaded) {
              tl.pause();
            }
          },
          [],
          "waitForAssets"
        )
        // Ethera word exit (runs after assets are loaded)
        .to(
          etheraWord?.querySelectorAll(".char span") || [],
          {
            y: "-100%",
            duration: 0.75,
            stagger: 0.05,
          },
          ">0.45" // Start 0.45s after waitForAssets label
        );

      // Tags exit
      tags.forEach((tag, index) => {
        tl.to(
          (tag as HTMLElement).querySelectorAll("p .word"),
          {
            y: "100%",
            duration: 0.75,
          },
          `<${index * 0.1}`
        );
      });

      // Block animations
      tl.to(
        ".block-1",
        {
          y: "-100%",
          duration: 1,
        },
        "<0.25"
      )
        .to(
          ".block-2",
          {
            y: "100%",
            duration: 1,
          },
          "<" // Start at the same time as block-1
        )
        .call(() => {
          // Signal that preloader animation is complete
          useLoadingStore.getState().actions.setPreloaderAnimationComplete();
        });

      // Hide elements
      tl.set(
        ".preloader",
        {
          display: "none",
        },
        ">0.75"
      )
        .set(
          ".tags-overlay",
          {
            display: "none",
          },
          ">0.5"
        )
        .set(
          ".block",
          {
            display: "none",
          },
          "<" // Same time as tags-overlay
        )
        .call(() => {
          setIsHidden(true);
        });

      // Store timeline in ref for external control
      timelineRef.current = tl;
    },
    { dependencies: [isMobile, splitTextReady, shouldSkip, isHidden] }
  );

  // Return null if skipping or hidden (after all hooks have been called)
  if (shouldSkip || isHidden) {
    return null;
  }

  return (
    <>
      <div className="preloader">
        <div className="intro-title">
          <span>Ethera Supplements</span>
        </div>
      </div>

      <div className="block block-1" />
      <div className="block block-2" />

      <div className="tags-overlay">
        <div className="tag tag-1">
          <p>Essentials only</p>
        </div>
        <div className="tag tag-2">
          <p>Focus on maximum growth</p>
        </div>
      </div>
    </>
  );
}
