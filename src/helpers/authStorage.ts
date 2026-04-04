/** Parsed `auth` object stored in localStorage (tokens + kennel profile). */
export type StoredAuth = {
	access?: string;
	refresh?: string;
	kennel?: unknown;
};

export function readAuthFromStorage(): StoredAuth | null {
	const raw = localStorage.getItem("auth");
	if (!raw) return null;
	try {
		return JSON.parse(raw) as StoredAuth;
	} catch {
		localStorage.removeItem("auth");
		localStorage.removeItem("kennel");
		return null;
	}
}

export function clearAuthStorage(): void {
	localStorage.removeItem("auth");
	localStorage.removeItem("kennel");
}
