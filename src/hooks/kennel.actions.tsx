import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios.tsx";
import { setKennel } from "../store/kennels/actions.tsx";
import { useAuth } from "../AuthContext.tsx";

interface LoginData {
	user: any;
	access: string;
	refresh: string;
}

interface EditData {
	[key: string]: any;
}

interface KennelData {
	access: string;
	refresh: string;
	user: any;
}

// Hook for kennel actions
function useKennelActions() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const baseURL = process.env.REACT_APP_NEO_PROJECT_BASE_URL;
	const auth = useAuth();
	const loginToContext = auth?.login ?? (() => {});

	return {
		login,
		logout,
		edit,
	};

	// Login the kennel
	function login(data: any) {
		return axiosService
			.post(`${baseURL}api/auth/login/`, data)
			.then((res) => {
				setKennelData(res.data);
				dispatch(setKennel(res.data.user.id));
				loginToContext(res.data.user);
				navigate("/KennelAccount");
			})
			.catch((err) => {
				console.error("Login error:", err);
				throw err;
			});
	}

	// Edit kennel details
	function edit(data: EditData, kennelId: string | number) {
		return axiosService
			.patch(`${baseURL}api/kennel/${kennelId}/`, data, {
				headers: { "Content-Type": "application/json" },
			})
			.then((res) => {
				const accessToken = getAccessToken();
				const refreshToken = getRefreshToken();
				if (accessToken && refreshToken) {
					localStorage.setItem(
						"auth",
						JSON.stringify({
							access: accessToken,
							refresh: refreshToken,
							kennel: res.data,
						})
					);
				}
				loginToContext(res.data); // <-- Update AuthContext state here
			});
	}

	// Logout the kennel
	function logout() {
		const refresh = getRefreshToken();
		if (!refresh) {
			localStorage.removeItem("auth");
			navigate("/kennelAdmin");
			return;
		}

		return axiosService
			.post(`${baseURL}auth/logout/`, { refresh })
			.then(() => {
				localStorage.removeItem("auth");
				navigate("/kennelAdmin");
			})
			.catch(() => {
				localStorage.removeItem("auth");
				navigate("/kennelAdmin");
			});
	}
}

// Get the kennel from localStorage
function getKennel() {
	const authData = localStorage.getItem("auth");
	if (!authData) return null;
	const auth = JSON.parse(authData);
	return auth?.kennel || null;
}

// Get access token
function getAccessToken() {
	const authData = localStorage.getItem("auth");
	if (!authData) return null;
	const auth = JSON.parse(authData);
	return auth?.access || null;
}

// Get refresh token
function getRefreshToken() {
	const authData = localStorage.getItem("auth");
	if (!authData) return null;
	const auth = JSON.parse(authData);
	return auth?.refresh || null;
}

// Set kennel + tokens in localStorage
function setKennelData(data: KennelData) {
	localStorage.setItem(
		"auth",
		JSON.stringify({
			access: data.access,
			refresh: data.refresh,
			kennel: data.user, // Ensures it's accessible via getKennel()
		})
	);
}

export {
	useKennelActions,
	getKennel,
	getAccessToken,
	getRefreshToken,
	setKennelData,
};
