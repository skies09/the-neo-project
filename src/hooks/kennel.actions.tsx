import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import { setKennel } from "../store/kennels/actions";
import { useAuth } from "../AuthContext";
import type { Kennel } from "../services/api";
import { clearAuthStorage, readAuthFromStorage } from "../helpers/authStorage";

interface LoginBody {
	username: string;
	password: string;
}

interface LoginResponse {
	user: Kennel;
	access: string;
	refresh: string;
	requires_password_reset?: boolean;
}

interface EditData {
	[key: string]: unknown;
}

function useKennelActions() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { login: loginToContext, logout: logoutFromContext } = useAuth();

	const login = (data: LoginBody) => {
		return axiosService
			.post<LoginResponse>(`/api/auth/login/`, data)
			.then((res) => {
				const responseData = res.data;
				setKennelData(responseData);
				dispatch(setKennel(responseData.user.id));
				loginToContext(responseData.user);

				if (responseData.requires_password_reset) {
					navigate("/password-reset");
				} else {
					navigate("/kennel-account");
				}
			})
			.catch((err) => {
				throw err;
			});
	};

	const resetPassword = (data: {
		new_password: string;
		confirm_password: string;
	}) => {
		return axiosService
			.post(`/api/auth/first-time-password-reset/`, data)
			.then((res) => {
				navigate("/kennel-account");
				return res.data;
			})
			.catch((err) => {
				console.error("Password reset error:", err);
				throw err;
			});
	};

	const edit = (data: EditData, kennelPublicId: string) => {
		return axiosService
			.patch<Kennel>(`/api/kennels/${kennelPublicId}/`, data)
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
	};

	const logout = () => {
		const refresh = getRefreshToken();
		if (!refresh) {
			clearAuthStorage();
			logoutFromContext();
			navigate("/kennel-admin");
			return Promise.resolve();
		}

		return axiosService
			.post(`/api/auth/logout/`, { refresh })
			.then(() => {
				clearAuthStorage();
				logoutFromContext();
				navigate("/kennel-admin");
			})
			.catch(() => {
				clearAuthStorage();
				logoutFromContext();
				navigate("/kennel-admin");
			});
	};

	return {
		login,
		logout,
		edit,
		resetPassword,
	};
}

function getKennel(): Kennel | null {
	const auth = readAuthFromStorage();
	const k = auth?.kennel;
	return k && typeof k === "object" ? (k as Kennel) : null;
}

function getAccessToken(): string | null {
	const auth = readAuthFromStorage();
	const t = auth?.access;
	return typeof t === "string" ? t : null;
}

function getRefreshToken(): string | null {
	const auth = readAuthFromStorage();
	const t = auth?.refresh;
	return typeof t === "string" ? t : null;
}

function setKennelData(data: {
	access: string;
	refresh: string;
	user: Kennel;
}) {
	localStorage.setItem(
		"auth",
		JSON.stringify({
			access: data.access,
			refresh: data.refresh,
			kennel: data.user,
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
