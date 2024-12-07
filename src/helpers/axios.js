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
	 * Retrieving the access and refresh tokens from the local storage
	 */
	config.headers.Authorization = `Bearer ${getAccessToken()}`;
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
			{
				refresh: getRefreshToken(),
			},
			{
				baseURL: process.env.REACT_APP_NEO_PROJECT_BASE_URL,
			}
		)
		.then((resp) => {
			const { access } = resp.data;
			failedRequest.response.config.headers["Authorization"] =
				"Bearer " + access;
			localStorage.setItem(
				"auth",
				JSON.stringify({
					access,
					refresh: getRefreshToken(),
					user: getKennel(),
				})
			);
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
