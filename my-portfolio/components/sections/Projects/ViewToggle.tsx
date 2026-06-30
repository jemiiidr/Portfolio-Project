import Image from "next/image";

import GridIcon from "@/public/icons/GridIcon.svg";
import GridIconActive from "@/public/icons/GridIcon_A.svg";
import ListIcon from "@/public/icons/ListIcon.svg";
import ListIconActive from "@/public/icons/ListIcon_A.svg";

interface ViewToggleProps {
	view: "grid" | "list";
	onChange: (view: "grid" | "list") => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
	return (
		<div className="flex h-16 overflow-hidden border border-muted-cream/50">
			<button
				type="button"
				aria-label="Grid view"
				onClick={() => onChange("grid")}
				className={`grid h-full w-16 place-items-center border-r border-muted-cream/50 transition-all duration-300 ease-out ${
					view === "grid" ? "bg-muted-cream/10" : "hover:bg-muted-cream/5"
				}`}
			>
				<Image
					src={view === "grid" ? GridIconActive : GridIcon}
					alt="Grid view"
					width={28}
					height={28}
					className={`transition-all duration-300 ease-out ${
						view === "grid" ? "scale-110" : "scale-100"
					}`}
				/>
			</button>

			<button
				type="button"
				aria-label="List view"
				onClick={() => onChange("list")}
				className={`grid h-full w-16 place-items-center transition-all duration-300 ease-out ${
					view === "list" ? "bg-muted-cream/10" : "hover:bg-muted-cream/5"
				}`}
			>
				<Image
					src={view === "list" ? ListIconActive : ListIcon}
					alt="List view"
					width={28}
					height={28}
					className={`transition-all duration-300 ease-out ${
						view === "list" ? "scale-110" : "scale-100"
					}`}
				/>
			</button>
		</div>
	);
}
