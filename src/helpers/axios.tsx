import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAccessToken, getRefreshToken } from "../hooks/kennel.actions";

const axiosService = axios.create({
	baseURL: process.env.REACT_APP_NEO_PROJECT_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

function safeGetAccessToken(): string {
	const token = getAccessToken();
	return typeof token === "string" ? token : "";
}

function safeGetRefreshToken(): string {
	const token = getRefreshToken();
	return typeof token === "string" ? token : "";
}

axiosService.interceptors.request.use(async (config) => {
	/**
	 * Retrieving the access token from local storage
	 */
	const token = safeGetAccessToken();

	// Skip adding Authorization header for login and refresh endpoints
	if (
		(config.url &&
			(config.url.includes("/api/auth/login") ||
				config.url.includes("/auth/refresh"))) ||
		!token
	) {
		return config;
	}

	if (config.headers && typeof token === "string") {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosService.interceptors.response.use(
	(res) => Promise.resolve(res),
	(err) => {
		// Don't redirect on login errors - let the component handle them
		if (err.config?.url?.includes("/api/auth/login")) {
			console.log("Login error in interceptor:", err);
			return Promise.reject(err);
		}
		return Promise.reject(err);
	}
);

const refreshAuthLogic = async (failedRequest: any) => {
	// Don't try to refresh auth for login requests
	if (failedRequest.config?.url?.includes("/api/auth/login")) {
		return Promise.reject(failedRequest);
	}

	return axios
		.post(
			"/auth/refresh/",
			{ refresh: safeGetRefreshToken() },
			{ baseURL: process.env.REACT_APP_NEO_PROJECT_BASE_URL }
		)
		.then((resp) => {
			const { access } = resp.data;

			// IMPORTANT: update the localStorage with new access token and keep refresh & kennel data intact
			const authData = localStorage.getItem("auth");
			const oldAuth = authData ? JSON.parse(authData) : {};
			localStorage.setItem(
				"auth",
				JSON.stringify({
					access, // updated access token
					refresh: oldAuth.refresh, // keep the same refresh token
					kennel: oldAuth.kennel, // keep kennel info as is
				})
			);

			if (typeof access === "string") {
				failedRequest.response.config.headers["Authorization"] =
					"Bearer " + access;
			}
		})
		.catch(() => {
			localStorage.removeItem("auth");
			// Redirect to login page if refresh fails
			window.location.href = "/kennelAdmin"; // or your login route
		});
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url: string) {
	if (typeof url !== "string") throw new Error("URL must be a string");
	return axiosService.get(url).then((res) => res.data);
}

export default axiosService;
