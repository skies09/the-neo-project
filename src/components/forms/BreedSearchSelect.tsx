import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faSearch,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

export interface BreedSearchOption {
	value: string;
	label: string;
	group: string;
}

interface BreedSearchSelectProps {
	options: BreedSearchOption[];
	value: string;
	onChange: (value: string) => void;
	emptyLabel?: string;
	className?: string;
}

function groupOptions(
	options: BreedSearchOption[]
): Map<string, BreedSearchOption[]> {
	const map = new Map<string, BreedSearchOption[]>();
	for (const opt of options) {
		const g = opt.group || "Other";
		if (!map.has(g)) map.set(g, []);
		map.get(g)!.push(opt);
	}
	for (const [, list] of map) {
		list.sort((a, b) => a.label.localeCompare(b.label));
	}
	return new Map([...map.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

export function BreedSearchSelect({
	options,
	value,
	onChange,
	emptyLabel = "No preference",
	className = "",
}: BreedSearchSelectProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [highlighted, setHighlighted] = useState(0);
	const rootRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	const selected = useMemo(
		() => options.find((o) => o.value === value),
		[options, value]
	);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return options;
		return options.filter(
			(o) =>
				o.label.toLowerCase().includes(q) ||
				o.group.toLowerCase().includes(q)
		);
	}, [options, query]);

	const flatList = useMemo(() => {
		const grouped = groupOptions(filtered);
		const rows: Array<
			| { type: "header"; key: string; group: string }
			| { type: "option"; key: string; option: BreedSearchOption }
		> = [];
		for (const [group, list] of grouped) {
			rows.push({ type: "header", key: `h-${group}`, group });
			for (const opt of list) {
				rows.push({ type: "option", key: opt.value, option: opt });
			}
		}
		return rows;
	}, [filtered]);

	const listItems = useMemo(() => {
		const items: Array<
			| { type: "none"; key: string }
			| { type: "header"; key: string; group: string }
			| { type: "option"; key: string; option: BreedSearchOption }
		> = [{ type: "none", key: "__none__" }];
		items.push(...flatList);
		return items;
	}, [flatList]);

	const selectableIndices = useMemo(() => {
		const indices: number[] = [];
		listItems.forEach((item, i) => {
			if (item.type === "none" || item.type === "option") indices.push(i);
		});
		return indices;
	}, [listItems]);

	useEffect(() => {
		if (!open) return;
		const onDoc = (e: MouseEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) {
				setOpen(false);
				setQuery("");
			}
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, [open]);

	useEffect(() => {
		if (open) setHighlighted(0);
	}, [open, query, filtered.length]);

	useEffect(() => {
		if (!open || selectableIndices.length === 0) return;
		setHighlighted((h) => Math.min(h, selectableIndices.length - 1));
	}, [open, selectableIndices.length]);

	const applyHighlighted = useCallback(() => {
		const idx = selectableIndices[highlighted];
		if (idx === undefined) return;
		const item = listItems[idx];
		if (!item) return;
		if (item.type === "none") {
			onChange("");
			setOpen(false);
			setQuery("");
			return;
		}
		if (item.type === "option") {
			onChange(item.option.value);
			setOpen(false);
			setQuery("");
		}
	}, [highlighted, listItems, onChange, selectableIndices]);

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (!open) {
			if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
				e.preventDefault();
				setOpen(true);
			}
			return;
		}
		if (e.key === "Escape") {
			e.preventDefault();
			setOpen(false);
			setQuery("");
			return;
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlighted((h) =>
				Math.min(h + 1, selectableIndices.length - 1)
			);
			return;
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlighted((h) => Math.max(h - 1, 0));
			return;
		}
		if (e.key === "Enter") {
			e.preventDefault();
			applyHighlighted();
		}
	};

	useEffect(() => {
		if (!open || !listRef.current) return;
		const el = listRef.current.querySelector(
			`[data-highlight-index="${highlighted}"]`
		);
		el?.scrollIntoView({ block: "nearest" });
	}, [highlighted, open, listItems]);

	let highlightCursor = -1;

	return (
		<div ref={rootRef} className={`relative ${className}`}>
			<button
				type="button"
				id="breed-search-trigger"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls="breed-search-listbox"
				onClick={() => setOpen((o) => !o)}
				onKeyDown={onKeyDown}
				className="flex w-full items-center gap-3 rounded-2xl border-2 border-oxfordBlue bg-gradient-to-r from-tara to-mintCream py-4 pl-5 pr-12 text-left font-poppins font-semibold text-oxfordBlue shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:border-highland/70 focus:border-highland focus:outline-none focus:ring-2 focus:ring-highland"
			>
				<span className="min-w-0 flex-1">
					{selected ? (
						<>
							<span className="block truncate">{selected.label}</span>
							<span className="mt-0.5 block truncate text-xs font-medium text-oxfordBlue/60">
								{selected.group}
							</span>
						</>
					) : (
						<span className="text-oxfordBlue/80">{emptyLabel}</span>
					)}
				</span>
				<span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-oxfordBlue/70">
					<FontAwesomeIcon icon={faChevronDown} className="text-lg" />
				</span>
			</button>

			{open && (
				<div
					id="breed-search-listbox"
					role="listbox"
					aria-labelledby="breed-search-trigger"
					className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border-2 border-oxfordBlue/30 bg-mintCream shadow-xl"
				>
					<div className="flex items-center gap-2 border-b border-oxfordBlue/15 bg-tara/40 px-3 py-2">
						<FontAwesomeIcon
							icon={faSearch}
							className="text-oxfordBlue/50"
							aria-hidden
						/>
						<input
							type="search"
							autoFocus
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={onKeyDown}
							placeholder="Search breed or group…"
							className="min-w-0 flex-1 bg-transparent py-2 font-poppins text-sm text-oxfordBlue placeholder:text-oxfordBlue/40 focus:outline-none"
							aria-label="Filter breeds"
						/>
						{query && (
							<button
								type="button"
								onClick={() => setQuery("")}
								className="rounded-full p-1 text-oxfordBlue/50 hover:bg-oxfordBlue/10 hover:text-oxfordBlue"
								aria-label="Clear search"
							>
								<FontAwesomeIcon icon={faTimes} className="text-sm" />
							</button>
						)}
					</div>
					<div
						ref={listRef}
						className="max-h-[min(22rem,50vh)] overflow-y-auto overscroll-contain py-1"
					>
						{listItems.map((item) => {
							if (item.type === "header") {
								return (
									<div
										key={item.key}
										className="sticky top-0 z-10 bg-mintCream/95 px-4 py-2 text-xs font-bold uppercase tracking-wide text-highland backdrop-blur-sm"
									>
										{item.group}
									</div>
								);
							}
							if (item.type === "none") {
								highlightCursor += 1;
								const hi = highlightCursor;
								const isHi = highlighted === hi;
								const isSel = value === "";
								return (
									<button
										key={item.key}
										type="button"
										role="option"
										aria-selected={isSel}
										data-highlight-index={hi}
										onMouseEnter={() => setHighlighted(hi)}
										onClick={() => {
											onChange("");
											setOpen(false);
											setQuery("");
										}}
										className={`flex w-full flex-col px-4 py-3 text-left font-poppins transition-colors ${
											isHi
												? "bg-highland/15 text-oxfordBlue"
												: "text-oxfordBlue hover:bg-tara/60"
										} ${isSel ? "border-l-4 border-highland" : "border-l-4 border-transparent"}`}
									>
										<span className="font-semibold">{emptyLabel}</span>
										<span className="text-xs text-oxfordBlue/60">
											Show dogs of any breed
										</span>
									</button>
								);
							}
							highlightCursor += 1;
							const hi = highlightCursor;
							const isHi = highlighted === hi;
							const isSel = value === item.option.value;
							return (
								<button
									key={item.key}
									type="button"
									role="option"
									aria-selected={isSel}
									data-highlight-index={hi}
									onMouseEnter={() => setHighlighted(hi)}
									onClick={() => {
										onChange(item.option.value);
										setOpen(false);
										setQuery("");
									}}
									className={`flex w-full flex-col px-4 py-2.5 text-left font-poppins transition-colors ${
										isHi
											? "bg-highland/15 text-oxfordBlue"
											: "text-oxfordBlue hover:bg-tara/60"
									} ${isSel ? "border-l-4 border-highland" : "border-l-4 border-transparent"}`}
								>
									<span className="font-semibold leading-snug">
										{item.option.label}
									</span>
									<span className="text-xs text-oxfordBlue/55">
										{item.option.group}
									</span>
								</button>
							);
						})}
						{filtered.length === 0 && query.trim() && (
							<p className="px-4 py-6 text-center font-poppins text-sm text-oxfordBlue/60">
								No breeds match “{query.trim()}”. Try another search or
								choose no preference.
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
