import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import { setKennel } from "../store/kennels/actions";
import { useAuth } from "../AuthContext";

interface LoginData {
	user: any;
	access: string;
	refresh: string;
	requires_password_reset?: boolean;
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
	const auth = useAuth();
	const loginToContext = auth?.login ?? (() => {});

	return {
		login,
		logout,
		edit,
		resetPassword,
	};

	// Login the kennel
	function login(data: any) {
		return axiosService
			.post(`/api/auth/login/`, data)
			.then((res) => {
				const responseData = res.data;
				setKennelData(responseData);
				dispatch(setKennel(responseData.user.id));
				loginToContext(responseData.user);

				// Check if password reset is required
				if (responseData.requires_password_reset) {
					navigate("/password-reset");
				} else {
					navigate("/KennelAccount");
				}
			})
			.catch((err) => {
				throw err;
			});
	}

	// Reset password for first-time login
	function resetPassword(data: {
		new_password: string;
		confirm_password: string;
	}) {
		return axiosService
			.post(`/api/auth/first-time-password-reset/`, data)
			.then((res) => {
				// After successful password reset, navigate to kennel account
				navigate("/KennelAccount");
				return res.data;
			})
			.catch((err) => {
				console.error("Password reset error:", err);
				throw err;
			});
	}

	// Edit kennel details
	function edit(data: EditData, kennelPublicId: string) {
		return axiosService
			.patch(`/api/kennels/${kennelPublicId}/`, data)
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
				loginToContext(res.data);
				return res.data;
			})
			.catch((err) => {
				console.error("Edit kennel error:", err);
				throw err;
			});
	}

	// Logout the kennel
	function logout() {
		const refresh = getRefreshToken();
		if (!refresh) {
			localStorage.removeItem("auth");
			navigate("/kennelAdmin");
			return Promise.resolve();
		}

		return axiosService
			.post(`/api/auth/logout/`, { refresh })
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
