import type { IconType } from "react-icons";

export interface SkillCard {
	title: string;
	icon: IconType;
	iconLabel: string;
	tags: string[];
}

export interface SkillCardProps {
	skill: SkillCard;
}
