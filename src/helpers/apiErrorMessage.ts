/**
 * User-facing copy when the server responds with HTTP 404 (treated as a
 * temporary / availability issue rather than a specific “not found” screen).
 */
export const API_HTTP_404_USER_MESSAGE =
	"Our system is having trouble right now. Please check back later, or contact us and we will help as soon as we can.";

type Axiosish = {
	response?: { status?: number; data?: unknown };
	message?: string;
	code?: string;
};

function httpStatus(err: unknown): number | undefined {
	if (typeof err !== "object" || err === null) return undefined;
	const s = (err as Axiosish).response?.status;
	return typeof s === "number" ? s : undefined;
}

function extractBodyMessage(data: unknown): string | undefined {
	if (typeof data === "string" && data.trim()) return data;
	if (!data || typeof data !== "object") return undefined;
	const d = data as Record<string, unknown>;
	for (const key of ["error", "detail", "message"] as const) {
		const v = d[key];
		if (typeof v === "string" && v.trim()) return v;
	}
	const nfe = d.non_field_errors;
	if (Array.isArray(nfe) && typeof nfe[0] === "string") return nfe[0];
	if (typeof nfe === "string") return nfe;
	return undefined;
}

/** Browser / axios transport strings — not useful alone; prefer caller `fallback` in {@link resolveApiErrorMessage}. */
function isTransportOnlyMessage(message: string): boolean {
	const t = message.trim().toLowerCase();
	if (!t) return false;
	if (t === "network error" || t === "failed to fetch") return true;
	if (t.includes("failed to execute 'fetch'")) return true;
	if (t.includes("load failed")) return true;
	return false;
}

/**
 * Prefer a 404-specific message, then API body fields, then `err.message`,
 * then `fallback`. Transport-only `err.message` values (e.g. “Network Error”)
 * are skipped so `fallback` is used instead.
 */
export function resolveApiErrorMessage(
	err: unknown,
	fallback: string,
): string {
	if (httpStatus(err) === 404) {
		return API_HTTP_404_USER_MESSAGE;
	}
	const e = err as Axiosish;
	const fromData = extractBodyMessage(e.response?.data);
	if (fromData) return fromData;
	if (typeof e.message === "string" && e.message.trim()) {
		if (!isTransportOnlyMessage(e.message)) {
			return e.message;
		}
	}
	return fallback;
}

/**
 * For ErrorCard `detail`: hide browser/transport noise so the card relies on title + subtitle only.
 */
export function optionalFetchErrorDetail(message: string): string | undefined {
	if (!message.trim() || isTransportOnlyMessage(message)) return undefined;
	return message.trim();
}

/** Default `resolveApiErrorMessage` fallback from `ContactForm` — hide as ErrorCard `detail` (title + subtitle are enough). */
export const CONTACT_FORM_SUBMIT_FALLBACK_MESSAGE =
	"Failed to submit form. Please try again.";

/**
 * Lines to show under {@link ErrorCard} title for contact submit failures:
 * omits generic fallback and transport-only strings.
 */
export function contactSubmitErrorCardDetail(resolved: string): string | undefined {
	const t = resolved.trim();
	if (!t) return undefined;
	if (t === CONTACT_FORM_SUBMIT_FALLBACK_MESSAGE) return undefined;
	return optionalFetchErrorDetail(resolved);
}

const SHOP_GENERIC_FETCH_DETAIL_MESSAGES = new Set([
	"Failed to fetch categories",
	"Failed to fetch products",
	"Failed to fetch product",
	"Failed to fetch bestseller products",
]);

/**
 * Shop {@link ErrorCard} `detail`: omit Redux fallbacks that repeat what the title + subtitle already cover.
 */
export function shopFetchErrorCardDetail(storedMessage: string): string | undefined {
	const t = storedMessage.trim();
	if (!t) return undefined;
	if (SHOP_GENERIC_FETCH_DETAIL_MESSAGES.has(t)) return undefined;
	return optionalFetchErrorDetail(storedMessage);
}

/**
 * Connectivity / transport failures (no useful HTTP error body), e.g. offline
 * or server unreachable — use ErrorCard with `showSubtitle` / contact link.
 */
export function isNetworkOrTransportFailure(err: unknown): boolean {
	if (typeof err !== "object" || err === null) return false;
	if (err instanceof TypeError && typeof err.message === "string") {
		return isTransportOnlyMessage(err.message);
	}
	const e = err as Axiosish;
	const msg = typeof e.message === "string" ? e.message : "";
	if (msg && isTransportOnlyMessage(msg)) return true;
	const code = typeof e.code === "string" ? e.code : "";
	if (code === "ECONNABORTED" || code === "ERR_NETWORK") return true;
	if (!e.response && msg.trim()) {
		const low = msg.toLowerCase();
		if (low.includes("network error")) return true;
		if (low.includes("timeout")) return true;
		if (low.includes("econnrefused")) return true;
	}
	return false;
}
