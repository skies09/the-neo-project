import { readAuthFromStorage, clearAuthStorage } from "./authStorage";

describe("readAuthFromStorage", () => {
	const key = "auth";

	beforeEach(() => {
		localStorage.clear();
	});

	it("returns null when missing", () => {
		expect(readAuthFromStorage()).toBeNull();
	});

	it("parses valid JSON", () => {
		localStorage.setItem(
			key,
			JSON.stringify({ access: "a", refresh: "r", kennel: { id: "1" } })
		);
		expect(readAuthFromStorage()).toEqual({
			access: "a",
			refresh: "r",
			kennel: { id: "1" },
		});
	});

	it("clears storage on invalid JSON", () => {
		localStorage.setItem(key, "{not-json");
		expect(readAuthFromStorage()).toBeNull();
		expect(localStorage.getItem(key)).toBeNull();
	});
});

describe("clearAuthStorage", () => {
	it("removes auth keys", () => {
		localStorage.setItem("auth", "{}");
		localStorage.setItem("kennel", "{}");
		clearAuthStorage();
		expect(localStorage.getItem("auth")).toBeNull();
		expect(localStorage.getItem("kennel")).toBeNull();
	});
});
