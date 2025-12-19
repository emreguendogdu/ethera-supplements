"use client";

import useDeviceSize from "@/hooks/useDeviceSize";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useEffect, useState } from "react";
import "./NewPreloader2.css";

gsap.registerPlugin(SplitText, CustomEase);

const splitTextElements = (
  selector: string,
  type = "words,chars",
  addFirstChar = false
) => {
  if (typeof document === "undefined") return;
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    const splitText = new SplitText(element, {
      type,
      wordsClass: "word",
      charsClass: "char",
    });

    if (type.includes("chars")) {
      splitText.chars.forEach((char, index) => {
        const originalText = char.textContent;
        char.innerHTML = `<span>${originalText}</span>`;

        if (addFirstChar && index === 0) {
          char.classList.add("first-char");
        }
      });
    }
  });
};

CustomEase.create("hop", ".8, 0, .3, 1");

export default function NewPreloader2() {
  const { isMobile } = useDeviceSize();
  const [splitTextReady, setSplitTextReady] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    // Wait a bit to ensure DOM is ready
    const timer = setTimeout(() => {
      splitTextElements(".preloader .intro-title span", "words, chars", true);
      // splitTextElements(
      //   ".split-overlay .intro-title span",
      //   "words, chars",
      //   true
      // );
      splitTextElements(".tag p", "words");
      setSplitTextReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      if (typeof window === "undefined" || !splitTextReady) return;

      // Get all words from intro-title
      const introWords = gsap.utils.toArray(
        ".preloader .intro-title .word"
      ) as HTMLElement[];
      const etheraWord = introWords[0]; // First word: "Ethera"
      const supplementsWord = introWords[1]; // Second word: "Supplements"

      // Set initial state - all chars start from top
      gsap.set(".preloader .intro-title .char span", {
        y: "-100%",
      });

      // Set initial state for blocks - they start covering the content
      gsap.set(".block-1", {
        y: 0,
      });
      gsap.set(".block-2", {
        y: 0,
      });

      // Set initial states for split-overlay elements (for reveal animation) - COMMENTED OUT
      // gsap.set(".split-overlay .intro-title .first-char span", { y: "0%" });

      // gsap.set(".split-overlay .intro-title .first-char", {
      //   x: isMobile ? "7.5rem" : "18rem",
      //   y: isMobile ? "-1rem" : "-2.75rem",
      //   fontWeight: "900",
      //   scale: 0.75,
      // });

      const tl = gsap.timeline({ defaults: { ease: "hop" } });
      const tags = gsap.utils.toArray(".tags-overlay .tag");

      // Animate tags
      tags.forEach((tag, index) => {
        tl.to(
          (tag as HTMLElement).querySelectorAll("p .word"),
          {
            y: "0%",
            duration: 0.75,
          },
          0.5 + index * 0.1
        );
      });

      // Step 1: Animate "Ethera Supplements" coming from top
      tl.to(
        ".preloader .intro-title .char span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
        },
        0.5
      )
        // Step 2: "Supplements" disappears through bottom
        .to(
          supplementsWord?.querySelectorAll(".char span") || [],
          {
            y: "100%",
            duration: 0.75,
            stagger: 0.05,
          },
          2
        )
        // Step 3 & 4: "Ethera" centers, then gets bigger and moves to top (~10%)
        .to(
          etheraWord?.querySelectorAll(".char") || [],
          {
            left: "100%",
            duration: 1.5,
          },
          2
        )
        // Hide "Supplements" word completely after animation
        .set(
          supplementsWord,
          {
            opacity: 0,
            pointerEvents: "none",
          },
          3.3
        ) // Step 2: "Supplements" disappears through bottom
        .to(
          etheraWord?.querySelectorAll(".char span") || [],
          {
            y: "-100%",
            duration: 0.75,
            stagger: 0.05,
          },
          3.75
        )
        .set(
          etheraWord,
          {
            opacity: 0,
            pointerEvents: "none",
          },
          3.75 + 0.7
        );

      // Animate tags out
      tags.forEach((tag, index) => {
        tl.to(
          (tag as HTMLElement).querySelectorAll("p .word"),
          {
            y: "100%",
            duration: 0.75,
          },
          4.25 + index * 0.1
        );
      });

      // Block reveal animation - animate blocks to reveal content
      tl.to(
        ".block-1",
        {
          y: "-100%",
          duration: 1,
        },
        4.25 + 0.25
      ).to(
        ".block-2",
        {
          y: "100%",
          duration: 1,
        },
        4.25 + 0.25
      );

      tl.set(
        ".preloader",
        {
          display: "none",
        },
        5
      );

      tl.set(
        ".tags-overlay",
        {
          display: "none",
        },
        5.5
      );

      tl.set(
        ".block",
        {
          display: "none",
        },
        5.5
      );
    },
    { dependencies: [isMobile, splitTextReady] }
  );

  return (
    <>
      <div className="preloader">
        <div className="intro-title">
          <span>Ethera Supplements</span>
        </div>
      </div>

      <div className="block block-1" />
      <div className="block block-2" />

      {/*     <div className="split-overlay">
        <div className="intro-title">
          <span>Ethera Supplements</span>
        </div>
      </div> */}

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
