"use client";

import React, {
  useRef,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

interface CopyProps {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  className?: string;
  type?: "lines" | "chars";
  stagger?: number;
  duration?: number;
  shouldAnimate?: boolean; // Controls when animation should start
}

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  className,
  type = "lines",
  stagger = 0.1,
  duration = 1,
  shouldAnimate = true,
}: CopyProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const elementRefs = useRef<Element[]>([]);
  const splitRefs = useRef<SplitText[]>([]);
  const lines = useRef<Element[]>([]);
  const chars = useRef<Element[]>([]);
  const [isPositioned, setIsPositioned] = useState(false);

  useGSAP(
    () => {
      if (!containerRef.current || !shouldAnimate) return;

      splitRefs.current = [];
      lines.current = [];
      chars.current = [];
      elementRefs.current = [];

      let elements: Element[] = [];
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children) as Element[];
      } else {
        elements = [containerRef.current];
      }

      // Ensure container has overflow hidden to prevent flash
      const containerElement = containerRef.current as HTMLElement;

      elements.forEach((element) => {
        elementRefs.current.push(element);

        const split =
          type === "chars"
            ? SplitText.create(element, {
                type: "chars",
                charsClass: "char++",
              })
            : SplitText.create(element, {
                type: "words, lines",
                mask: "lines" as const,
                linesClass: "line++",
                lineThreshold: 0.1,
              });

        splitRefs.current.push(split);

        // Ensure characters stay inline and don't wrap
        if (type === "chars" && split.chars) {
          const htmlElement = element as HTMLElement;
          // Preserve original display if it exists, otherwise ensure inline flow
          const originalDisplay = window.getComputedStyle(htmlElement).display;
          if (originalDisplay === "block") {
            htmlElement.style.display = "inline-block";
          }
          htmlElement.style.whiteSpace = "nowrap";
          split.chars.forEach((char) => {
            const charElement = char as HTMLElement;
            charElement.style.display = "inline-block";
            charElement.style.verticalAlign = "baseline";
          });
        }

        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines && split.lines.length > 0) {
            const firstLine = split.lines[0] as HTMLElement;
            if (firstLine) {
              firstLine.style.paddingLeft = textIndent;
            }
          }
          const htmlElement = element as HTMLElement;
          htmlElement.style.textIndent = "0";
        }

        if (type === "chars" && split.chars) {
          chars.current.push(...split.chars);
        } else if (split.lines) {
          lines.current.push(...split.lines);
        }
      });

      const elementsToAnimate =
        type === "chars" ? chars.current : lines.current;

      // Set initial position immediately to prevent flash
      gsap.set(elementsToAnimate, { y: "150%" });

      // Make container visible after positioning is set
      if (containerElement) {
        containerElement.style.visibility = "visible";
      }
      setIsPositioned(true);

      const animationProps = {
        y: "0%",
        duration: duration,
        stagger: stagger,
        ease: "power4.out",
        delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(elementsToAnimate, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(elementsToAnimate, animationProps);
      }

      return () => {
        splitRefs.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [
        animateOnScroll,
        delay,
        type,
        stagger,
        duration,
        shouldAnimate,
      ],
    }
  );

  if (React.Children.count(children) === 1) {
    const child = React.Children.only(children);
    if (React.isValidElement(child)) {
      const childProps = child.props as { style?: React.CSSProperties };
      return React.cloneElement(child as ReactElement<any>, {
        ref: containerRef,
        style: {
          ...(childProps.style || {}),
          visibility: shouldAnimate && isPositioned ? "visible" : "hidden",
        },
      });
    }
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      data-copy-wrapper="true"
      className={className}
      style={{
        visibility: shouldAnimate && isPositioned ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
}
