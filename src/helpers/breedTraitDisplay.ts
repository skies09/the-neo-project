/**
 * Parses API trait values (string or number) into a 0–100 percentage for display.
 * - Values in (10, 100] are treated as literal percentages.
 * - Values in [0, 10] are treated as a 1–10 style score (×10), e.g. 8 → 80%.
 * - Strings may include a "%" suffix or commas.
 * Returns null if the value is not numeric (plain text from the API).
 */
function percentFromNumber(n: number): number | null {
	if (!Number.isFinite(n)) return null;
	if (n < 0) return 0;
	if (n > 100) return 100;
	if (n <= 10) return Math.min(100, Math.round(n * 10));
	return Math.round(n);
}

export function parseTraitPercent(raw: unknown): number | null {
	if (raw === null || raw === undefined) return null;
	if (typeof raw === "number") {
		return percentFromNumber(raw);
	}
	if (typeof raw === "boolean") return null;
	if (typeof raw === "object") return null;
	const s = String(raw).trim();
	if (!s) return null;
	const withoutPct = s.endsWith("%") ? s.slice(0, -1).trim() : s;
	const n = parseFloat(withoutPct.replace(/,/g, ""));
	if (!Number.isFinite(n)) return null;
	return percentFromNumber(n);
}

/** Safe string for showing non-percent trait text. */
export function stringifyTraitValue(raw: unknown): string {
	if (raw === null || raw === undefined) return "";
	if (typeof raw === "string") return raw;
	if (typeof raw === "number" || typeof raw === "boolean") {
		return String(raw);
	}
	try {
		return String(raw);
	} catch {
		return "";
	}
}
