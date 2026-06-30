"use client";

import { useMemo, useState } from "react";

interface TagComboboxProps {
  availableTags: string[];
  selectedTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export default function TagCombobox({
  availableTags,
  selectedTags,
  onAddTag,
  onRemoveTag,
}: TagComboboxProps) {
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

  function handleSelectTag(tag: string) {
    onAddTag(tag);
    setInputValue("");
    setIsOpen(false);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (filteredTags.length > 0) {
      handleSelectTag(filteredTags[0]);
    }
  }

  return (
    <div className="relative w-full">
      <div className="flex min-h-16 w-full flex-wrap items-center gap-2 border border-muted-cream/50 bg-transparent px-3 py-2 transition focus-within:border-logic">
        {selectedTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onRemoveTag(tag)}
            className="inline-flex items-center gap-2 bg-logic px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-blk1"
          >
            <span>{tag}</span>
            <span aria-hidden="true">×</span>
          </button>
        ))}

        <input
          value={inputValue}
          onFocus={() => setIsOpen(true)}
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
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-40 max-h-64 w-full overflow-y-auto border border-muted-cream/50 bg-blk2">
          {filteredTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                handleSelectTag(tag);
              }}
              className="block w-full px-4 py-3 text-left text-xs font-black uppercase tracking-[0.08em] text-muted-cream transition hover:bg-logic hover:text-blk1"
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}