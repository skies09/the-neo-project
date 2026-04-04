import { formatDate, formatDateShort } from "./dateUtils";

describe("formatDate", () => {
	it("returns placeholder for empty input", () => {
		expect(formatDate("")).toBe("Date not available");
	});

	it("formats ISO date strings", () => {
		const s = formatDate("2024-06-15T12:00:00.000Z");
		expect(s).not.toBe("Date not available");
		expect(s.length).toBeGreaterThan(4);
	});
});

describe("formatDateShort", () => {
	it("delegates to formatDate with short month", () => {
		const s = formatDateShort("2024-03-01T00:00:00.000Z");
		expect(s).not.toBe("Date not available");
	});
});
