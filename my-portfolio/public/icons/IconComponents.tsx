import type { SVGProps } from "react";

interface CarouselArrowIconProps extends SVGProps<SVGSVGElement> {
	color?: string;
}

export function CarouselArrowIcon({
	color = "currentColor",
	...props
}: CarouselArrowIconProps) {
	return (
		<svg
			width="16"
			height="29"
			viewBox="0 0 16 29"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M1 27.5857L13.5858 14.9999"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M1.70711 0.292893C1.31658 -0.0976311 0.683418 -0.0976311 0.292893 0.292893C-0.0976311 0.683418 -0.0976311 1.31658 0.292893 1.70711L1 1L1.70711 0.292893ZM1 1L0.292893 1.70711L14.2929 15.7071L15 15L15.7071 14.2929L1.70711 0.292893L1 1Z"
				fill={color}
			/>
		</svg>
	);
}