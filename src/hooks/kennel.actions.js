import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import { setKennel } from "./../store/kennels/actions";
import { useAuth } from "../AuthContext";

// Hook for kennel actions
function useKennelActions() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const baseURL = process.env.REACT_APP_NEO_PROJECT_BASE_URL;
	const { login: loginToContext } = useAuth();

	return {
		login,
		logout,
		edit,
	};

	// Login the kennel
	function login(data) {
		return axiosService
			.post(`${baseURL}api/auth/login/`, data)
			.then((res) => {
				setKennelData(res.data);
				dispatch(setKennel(res.data.user.id));
				loginToContext(res.data.user); // <- Update context
				navigate("/KennelAccount");
			});
	}

	// Edit kennel details
	function edit(data, kennelId) {
		return axiosService
			.patch(`${baseURL}api/kennel/${kennelId}/`, data, {
				headers: { "Content-Type": "application/json" },
			})
			.then((res) => {
				localStorage.setItem(
					"auth",
					JSON.stringify({
						access: getAccessToken(),
						refresh: getRefreshToken(),
						kennel: res.data,
					})
				);
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
	const auth = JSON.parse(localStorage.getItem("auth"));
	return auth?.kennel || null;
}

// Get access token
function getAccessToken() {
	const auth = JSON.parse(localStorage.getItem("auth"));
	return auth?.access || null;
}

// Get refresh token
function getRefreshToken() {
	const auth = JSON.parse(localStorage.getItem("auth"));
	return auth?.refresh || null;
}

// Set kennel + tokens in localStorage
function setKennelData(data) {
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
