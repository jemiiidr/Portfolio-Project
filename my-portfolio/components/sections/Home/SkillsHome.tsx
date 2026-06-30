import { skills } from "@/lib/skill";
import SkillCard from "./SkillCard";

export default function SkillsHome() {
	const marqueeSkills = [
		...skills.map((skill) => ({
			skill,
			copy: "first",
		})),
		...skills.map((skill) => ({
			skill,
			copy: "second",
		})),
	];

	return (
		<section
			id="skills"
			className="min-h-screen min-w-screen overflow-x-hidden bg-blk2 px-6 py-28 text-cream md:py-32"
		>
			<div className="scroll-reveal mx-auto max-w-4xl text-center">
				<p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-muted-cream md:text-sm">
					Skills
				</p>

				<h2 className="text-4xl font-black tracking-[-0.06em] md:text-6xl">
					Technologies I <span className="scroll-color-fill">Work With</span>
				</h2>

				<p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-relaxed text-muted-cream md:text-base">
					A toolkit of technologies, frameworks and concepts I have used to
					build modern and impactful solutions.
				</p>
			</div>

			<div className="scroll-reveal skills-marquee mt-10 py-10">
				<div className="skills-marquee-track">
					{marqueeSkills.map(({ skill, copy }) => (
						<SkillCard key={`${copy}-${skill.title}`} skill={skill} />
					))}
				</div>
			</div>
		</section>
	);
}
