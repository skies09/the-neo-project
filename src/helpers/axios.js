import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {
	getAccessToken,
	getRefreshToken,
	getKennel,
} from "../hooks/kennel.actions";

const axiosService = axios.create({
	baseURL: process.env.REACT_APP_NEO_PROJECT_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosService.interceptors.request.use(async (config) => {
	/**
	 * Retrieving the access token from local storage
	 */
	const token = getAccessToken();

	// Skip adding Authorization header for login and refresh endpoints
	if (
		config.url.includes("/api/auth/login") ||
		config.url.includes("/auth/refresh") ||
		!token
	) {
		return config;
	}

	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axiosService.interceptors.response.use(
	(res) => Promise.resolve(res),
	(err) => Promise.reject(err)
);

const refreshAuthLogic = async (failedRequest) => {
	return axios
		.post(
			"/auth/refresh/",
			{ refresh: getRefreshToken() },
			{ baseURL: process.env.REACT_APP_NEO_PROJECT_BASE_URL }
		)
		.then((resp) => {
			const { access } = resp.data;

			// IMPORTANT: update the localStorage with new access token and keep refresh & kennel data intact
			const oldAuth = JSON.parse(localStorage.getItem("auth")) || {};
			localStorage.setItem(
				"auth",
				JSON.stringify({
					access, // updated access token
					refresh: oldAuth.refresh, // keep the same refresh token
					kennel: oldAuth.kennel, // keep kennel info as is
				})
			);

			failedRequest.response.config.headers["Authorization"] =
				"Bearer " + access;
		})
		.catch(() => {
			localStorage.removeItem("auth");
		});
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url) {
	return axiosService.get(url).then((res) => res.data);
}

export default axiosService;
