import GridIcon from "@/public/icons/GridIcon.svg";
import ListIcon from "@/public/icons/ListIcon.svg";

interface ViewToggleProps {
	view: "grid" | "list";
	onChange: (view: "grid" | "list") => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
	return (
		<div className="flex h-16 border border-muted-cream/50">
			<button
				type="button"
				aria-label="Grid view"
				onClick={() => onChange("grid")}
				className={`grid aspect-square h-full place-items-center border-r border-muted-cream/50 transition-colors ${
					view === "grid" ? "text-logic" : "text-muted-cream hover:text-cream"
				}`}
			>
				<GridIcon className="size-7" />
			</button>

			<button
				type="button"
				aria-label="List view"
				onClick={() => onChange("list")}
				className={`grid aspect-square h-full place-items-center transition-colors ${
					view === "list" ? "text-logic" : "text-muted-cream hover:text-cream"
				}`}
			>
				<ListIcon className="size-7" />
			</button>
		</div>
	);
}
