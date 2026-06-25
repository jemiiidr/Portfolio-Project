"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutHome() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="flex min-h-screen min-w-screen items-center bg-blk1 px-8 py-32 text-cream md:px-24 lg:px-36"
    >
      <div className="max-w-5xl">
        <p
          className={`mb-10 text-xs font-medium uppercase tracking-[0.45em] text-muted-cream transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          About Me
        </p>

        <h2
          className={`max-w-4xl text-3xl font-black leading-[1.08] tracking-[-0.045em] transition-all duration-700 md:text-5xl lg:text-6xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          I bridge the gap between creativity and technology. With experience
          in UI/UX design, front-end development, and AI-driven solutions, I
          build digital products that are{" "}
          <span
            className={`transition-colors delay-500 duration-700 ${
              isVisible ? "text-logic" : "text-cream"
            }`}
          >
            not only functional but thoughtfully designed
          </span>{" "}
          for the people who use them.
        </h2>
      </div>
    </section>
  );
}