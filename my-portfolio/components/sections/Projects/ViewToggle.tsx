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
        className={`grid aspect-square h-full place-items-center border-r border-muted-cream/50 transition ${
          view === "grid" ? "text-logic" : "text-muted-cream hover:text-cream"
        }`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="8" height="8" stroke="currentColor" />
          <rect x="16" y="4" width="8" height="8" stroke="currentColor" />
          <rect x="4" y="16" width="8" height="8" stroke="currentColor" />
          <rect x="16" y="16" width="8" height="8" stroke="currentColor" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="List view"
        onClick={() => onChange("list")}
        className={`grid aspect-square h-full place-items-center transition ${
          view === "list" ? "text-logic" : "text-muted-cream hover:text-cream"
        }`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <rect x="4" y="5" width="5" height="5" stroke="currentColor" />
          <path d="M12 6H24" stroke="currentColor" />
          <path d="M12 9H22" stroke="currentColor" />
          <rect x="4" y="16" width="5" height="5" stroke="currentColor" />
          <path d="M12 17H24" stroke="currentColor" />
          <path d="M12 20H22" stroke="currentColor" />
        </svg>
      </button>
    </div>
  );
}