"use client";

import type { PointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const typewriterWords = ["CREATE.", "THINK.", "THRIVE."] as const;

interface HeroTitleContentProps {
  variant: "base" | "highlight";
  onTextEnter?: () => void;
  onTextLeave?: () => void;
}

interface HeroTitleLineProps {
  children: ReactNode;
  isInteractive: boolean;
  onTextEnter?: () => void;
  onTextLeave?: () => void;
}

function HeroTitleLine({
  children,
  isInteractive,
  onTextEnter,
  onTextLeave,
}: HeroTitleLineProps) {
  return (
    <span className="hero-title-line">
      <span
        className="hero-title-hit"
        onPointerEnter={isInteractive ? onTextEnter : undefined}
        onPointerLeave={isInteractive ? onTextLeave : undefined}
      >
        {children}
      </span>
    </span>
  );
}

function HeroTitleContent({
  variant,
  onTextEnter,
  onTextLeave,
}: HeroTitleContentProps) {
  const isInteractive = variant === "base";
  const heartClassName = variant === "base" ? "text-heart" : "text-cream";
  const logicClassName = variant === "base" ? "text-logic" : "text-cream";

  return (
    <>
      <HeroTitleLine
        isInteractive={isInteractive}
        onTextEnter={onTextEnter}
        onTextLeave={onTextLeave}
      >
        Designing
      </HeroTitleLine>

      <HeroTitleLine
        isInteractive={isInteractive}
        onTextEnter={onTextEnter}
        onTextLeave={onTextLeave}
      >
        With <span className={heartClassName}>Heart.</span>
      </HeroTitleLine>

      <HeroTitleLine
        isInteractive={isInteractive}
        onTextEnter={onTextEnter}
        onTextLeave={onTextLeave}
      >
        Building
      </HeroTitleLine>

      <HeroTitleLine
        isInteractive={isInteractive}
        onTextEnter={onTextEnter}
        onTextLeave={onTextLeave}
      >
        With <span className={logicClassName}>Logic.</span>
      </HeroTitleLine>
    </>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  const [displayedWord, setDisplayedWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showIntroTooltip, setShowIntroTooltip] = useState(true);
  const [isTextHovered, setIsTextHovered] = useState(false);

  useEffect(() => {
    const tooltipTimeout = window.setTimeout(() => {
      setShowIntroTooltip(false);
    }, 2600);

    return () => {
      window.clearTimeout(tooltipTimeout);
    };
  }, []);

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex] ?? typewriterWords[0];

    if (!isDeleting && displayedWord === currentWord) {
      const pauseTimeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, 900);

      return () => {
        window.clearTimeout(pauseTimeout);
      };
    }

    if (isDeleting && displayedWord === "") {
      const nextWordTimeout = window.setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((currentIndex) => {
          return (currentIndex + 1) % typewriterWords.length;
        });
      }, 250);

      return () => {
        window.clearTimeout(nextWordTimeout);
      };
    }

    const typingTimeout = window.setTimeout(
      () => {
        const nextLength = displayedWord.length + (isDeleting ? -1 : 1);
        setDisplayedWord(currentWord.slice(0, nextLength));
      },
      isDeleting ? 45 : 90,
    );

    return () => {
      window.clearTimeout(typingTimeout);
    };
  }, [displayedWord, isDeleting, wordIndex]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section) {
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const cursorX = event.clientX - sectionRect.left;
    const cursorY = event.clientY - sectionRect.top;

    const gridX = (cursorX - sectionRect.width / 2) / 42;
    const gridY = (cursorY - sectionRect.height / 2) / 42;

    section.style.setProperty("--cursor-x", `${cursorX}px`);
    section.style.setProperty("--cursor-y", `${cursorY}px`);
    section.style.setProperty("--grid-x", `${gridX}px`);
    section.style.setProperty("--grid-y", `${gridY}px`);

    if (!title) {
      return;
    }

    const titleRect = title.getBoundingClientRect();
    const titleX = event.clientX - titleRect.left;
    const titleY = event.clientY - titleRect.top;

    title.style.setProperty("--title-x", `${titleX}px`);
    title.style.setProperty("--title-y", `${titleY}px`);
  }

  function handleTextEnter() {
    setIsTextHovered(true);
  }

  function handleTextLeave() {
    setIsTextHovered(false);
  }

  return (
    <section
      ref={sectionRef}
      className={`hero-interactive relative grid min-h-screen min-w-screen place-items-center overflow-hidden bg-blk1 px-6 py-32 text-center text-cream ${
        isTextHovered ? "hero-text-active" : ""
      }`}
      onPointerMove={handlePointerMove}
    >
      <div className="hero-motion-bg pointer-events-none absolute inset-0" />

      {/* Tooltip on initial load */}
      <div
        aria-hidden="true"
        className={`hero-cursor-tooltip pointer-events-none absolute left-0 top-0 z-30 rounded-full border border-logic bg-blk1 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-logic transition-opacity duration-1000 ${
          showIntroTooltip ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="hero-cursor-type">Hello there!</span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="hero-kicker mb-7 text-sm font-medium uppercase tracking-[0.42em] text-muted-cream md:mb-8 md:text-xl">
          Jamie Del Rosario
        </p>

        <div ref={titleRef} className="hero-title-wrap relative">
          <h1 className="hero-title-base text-[clamp(4.5rem,9vw,9.25rem)] font-black uppercase leading-[0.87] tracking-[-0.075em]">
            <HeroTitleContent
              variant="base"
              onTextEnter={handleTextEnter}
              onTextLeave={handleTextLeave}
            />
          </h1>

          <h1
            aria-hidden="true"
            className="hero-title-highlight pointer-events-none absolute inset-0 text-[clamp(4.5rem,9vw,9.25rem)] font-black uppercase leading-[0.87] tracking-[-0.075em]"
          >
            <HeroTitleContent variant="highlight" />
          </h1>
        </div>

        <p className="hero-typewriter mt-8 text-sm font-medium uppercase tracking-[0.42em] text-muted-cream md:mt-10 md:text-xl">
          <span>{displayedWord}</span>
          <span className="hero-type-caret" />
        </p>
      </div>
    </section>
  );
}