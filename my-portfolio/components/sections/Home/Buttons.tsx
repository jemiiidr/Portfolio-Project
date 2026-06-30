import Link from "next/link";
import type { ReactNode } from "react";

interface LinkButtonProps {
	href: string;
	children: ReactNode;
	className?: string;
}

export default function LinkButton({
	href,
	children,
	className = "",
}: LinkButtonProps) {
	const baseClassName =
		"inline-flex items-center justify-center rounded-none bg-logic px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-cream transition duration-300 hover:bg-heart";

	return (
		<Link href={href} className={`${baseClassName} ${className}`}>
			{children}{" "}
		</Link>
	);
}
