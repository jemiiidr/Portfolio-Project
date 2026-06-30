import type { SkillCardProps } from "@/types/skill";

export default function SkillCard({ skill }: SkillCardProps) {
	const Icon = skill.icon;

	return (
		<article className="group flex min-h-84 w-68 shrink-0 flex-col items-center justify-center border border-card-border bg-card px-6 py-8 text-center transition duration-500 hover:-translate-y-3 hover:border-logic/60 hover:bg-card/90 md:w-[20rem]">
			<div className="grid size-24 place-items-center rounded-[1.65rem] bg-tech-icon-bg transition duration-500 group-hover:scale-110 group-hover:rotate-3">
				<Icon
					aria-label={skill.iconLabel}
					className="size-14 text-heart transition duration-500 group-hover:text-logic"
				/>
			</div>

			<h3 className="mt-7 max-w-52 text-2xl font-black leading-[0.95] tracking-tighter text-cream md:text-3xl">
				{skill.title}
			</h3>

			<div className="mt-4 h-1 w-16 rounded-full bg-logic transition duration-500 group-hover:w-24" />

			<div className="mt-6 flex max-w-56 flex-wrap justify-center gap-2">
				{skill.tags.map((tag) => (
					<span
						key={tag}
						className="rounded bg-tech-icon-bg px-2.5 py-1 text-xs font-medium text-muted-cream transition duration-300 group-hover:text-cream"
					>
						{tag}
					</span>
				))}
			</div>
		</article>
	);
}
