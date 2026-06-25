"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProjectTimelineCard from "@/components/sections/Home/ProjectTimelineCard";
import { projects } from "@/lib/project";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export default function ProjectsHome() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [isTimelineComplete, setIsTimelineComplete] = useState(false);

  useEffect(() => {
    let animationFrameId = 0;

    function updateTimeline() {
      const section = sectionRef.current;
      const timeline = timelineRef.current;

      if (!section || !timeline) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollDistance = rect.height - viewportHeight;
      const rawProgress = scrollDistance > 0 ? -rect.top / scrollDistance : 0;
      const progress = clamp(rawProgress, 0, 1);
      const dotY = progress * timeline.offsetHeight;

      timeline.style.setProperty("--timeline-dot-y", `${dotY}px`);
      section.style.setProperty("--timeline-progress", progress.toFixed(3));

      setIsTimelineComplete((currentValue) => {
        const nextValue = progress > 0.985;

        return currentValue === nextValue ? currentValue : nextValue;
      });
    }

    function requestTimelineUpdate() {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateTimeline);
    }

    updateTimeline();

    window.addEventListener("scroll", requestTimelineUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestTimelineUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", requestTimelineUpdate);
      window.removeEventListener("resize", requestTimelineUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`projects-section relative min-h-[320vh] overflow-hidden bg-blk2 px-6 py-28 text-cream md:px-10 ${
        isTimelineComplete ? "projects-complete" : ""
      }`}
    >
      <div className="sticky top-24 z-20 mx-auto max-w-3xl text-center">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-muted-cream">
          Projects
        </p>

        <h2 className="text-4xl font-black tracking-[-0.06em] md:text-6xl">
          Building with{" "}
          <span className="bg-logic px-3 text-blk1">intention.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-relaxed text-muted-cream">
          Every project begins with curiosity and ends with purpose—whether
          through thoughtful design, scalable software, or emerging
          technologies.
        </p>
      </div>

      <div className="project-timeline-content relative mx-auto mt-32 max-w-7xl pb-128 pt-20">
        <div
          ref={timelineRef}
          aria-hidden="true"
          className="project-timeline-axis hidden lg:block"
        >
          <div className="project-timeline-trail" />
          <div className="project-timeline-dot" />
          <div className="project-timeline-end-marker" />

          <Link href="/projects" className="project-timeline-end-button">
            <span>View all projects</span>
          </Link>
        </div>

        <div className="space-y-48 md:space-y-60">
          {projects.map((project, index) => {
            const side = index % 2 === 0 ? "right" : "left";

            return (
              <div
                key={project.slug}
                data-side={side}
                className="project-row relative flex w-full justify-center lg:data-[side=left]:justify-start lg:data-[side=right]:justify-end"
              >
                <span
                  aria-hidden="true"
                  className="project-static-node hidden lg:block"
                />

                <ProjectTimelineCard project={project} side={side} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}