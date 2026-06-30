"use client";

import type { KeyboardEvent, WheelEvent } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

interface TagComboboxProps {
	availableTags: string[];
	selectedTags: string[];
	onAddTag: (tag: string) => void;
	onRemoveTag: (tag: string) => void;
}

function clamp(value: number, minimum: number, maximum: number) {
	return Math.min(Math.max(value, minimum), maximum);
}

export default function TagCombobox({
	availableTags,
	selectedTags,
	onAddTag,
	onRemoveTag,
}: TagComboboxProps) {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const inputId = useId();
	const listboxId = `${inputId}-listbox`;

	const [inputValue, setInputValue] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const filteredTags = useMemo(() => {
		const normalizedInput = inputValue.trim().toLowerCase();

		return availableTags.filter((tag) => {
			const isAlreadySelected = selectedTags.includes(tag);
			const matchesInput =
				normalizedInput.length === 0 ||
				tag.toLowerCase().includes(normalizedInput);

			return !isAlreadySelected && matchesInput;
		});
	}, [availableTags, inputValue, selectedTags]);

	useEffect(() => {
		function isInsideCombobox(target: EventTarget | null) {
			const root = rootRef.current;

			return root !== null && target instanceof Node && root.contains(target);
		}

		function handleDocumentPointerDown(event: PointerEvent) {
			if (!isInsideCombobox(event.target)) {
				setIsOpen(false);
				setInputValue("");
			}
		}

		function handleDocumentFocusIn(event: FocusEvent) {
			if (!isInsideCombobox(event.target)) {
				setIsOpen(false);
				setInputValue("");
			}
		}

		document.addEventListener("pointerdown", handleDocumentPointerDown);
		document.addEventListener("focusin", handleDocumentFocusIn);

		return () => {
			document.removeEventListener("pointerdown", handleDocumentPointerDown);
			document.removeEventListener("focusin", handleDocumentFocusIn);
		};
	}, []);

	function handleSelectTag(tag: string) {
		onAddTag(tag);
		setInputValue("");
		setIsOpen(false);
	}

	function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Escape") {
			setIsOpen(false);
			setInputValue("");
			return;
		}

		if (event.key === "Backspace" && inputValue.length === 0) {
			const lastSelectedTag = selectedTags[selectedTags.length - 1];

			if (lastSelectedTag) {
				onRemoveTag(lastSelectedTag);
			}

			return;
		}

		if (event.key !== "Enter") {
			return;
		}

		event.preventDefault();

		if (filteredTags.length > 0) {
			handleSelectTag(filteredTags[0]);
		}
	}

	function handleDropdownWheel(event: WheelEvent<HTMLDivElement>) {
		const dropdown = event.currentTarget;
		const maximumScrollTop = dropdown.scrollHeight - dropdown.clientHeight;

		event.preventDefault();
		event.stopPropagation();

		if (maximumScrollTop <= 0) {
			return;
		}

		dropdown.scrollTop = clamp(
			dropdown.scrollTop + event.deltaY,
			0,
			maximumScrollTop,
		);
	}

	return (
		<div ref={rootRef} className="relative w-full">
			<label htmlFor={inputId} className="sr-only">
				Filter projects by tags
			</label>

			<div className="flex min-h-16 w-full flex-wrap items-center gap-2 border border-muted-cream/50 bg-transparent px-3 py-2 transition focus-within:border-logic">
				{selectedTags.map((tag) => (
					<span
						key={tag}
						className="inline-flex items-center gap-2 bg-logic px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-blk1"
					>
						<span>{tag}</span>

						<button
							type="button"
							aria-label={`Remove ${tag} tag`}
							onClick={() => onRemoveTag(tag)}
							className="grid size-5 place-items-center rounded-full text-blk1 transition hover:bg-blk1/20 focus:outline-none focus:ring-2 focus:ring-blk1"
						>
							<span aria-hidden="true">×</span>
						</button>
					</span>
				))}

				<input
					id={inputId}
					role="combobox"
					aria-expanded={isOpen}
					aria-controls={listboxId}
					aria-autocomplete="list"
					value={inputValue}
					onFocus={() => setIsOpen(true)}
					onClick={() => setIsOpen(true)}
					onKeyDown={handleInputKeyDown}
					onChange={(event) => {
						setInputValue(event.target.value);
						setIsOpen(true);
					}}
					placeholder={selectedTags.length === 0 ? "Tags" : ""}
					className="h-8 min-w-24 flex-1 bg-transparent text-xs font-black uppercase tracking-[0.08em] text-cream outline-none placeholder:text-muted-cream"
				/>
			</div>

			{isOpen && filteredTags.length > 0 ? (
				<div
					id={listboxId}
					role="listbox"
					onWheel={handleDropdownWheel}
					className="tag-combobox-scrollbar absolute left-0 top-[calc(100%+0.5rem)] z-40 max-h-64 w-full overflow-y-auto overscroll-contain border border-muted-cream/50 bg-blk2"
				>
					{filteredTags.map((tag) => (
						<button
							key={tag}
							type="button"
							role="option"
							aria-selected="false"
							onMouseDown={(event) => {
								event.preventDefault();
								handleSelectTag(tag);
							}}
							className="block w-full px-4 py-3 text-left text-xs font-black uppercase tracking-[0.08em] text-muted-cream transition hover:bg-logic hover:text-blk1 focus:bg-logic focus:text-blk1 focus:outline-none"
						>
							{tag}
						</button>
					))}
				</div>
			) : null}
		</div>
	);
}
