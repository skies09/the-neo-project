import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import axios from "axios";
import { setKennel } from "./../store/kennels/actions";

function useKennelActions() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const baseURL = process.env.REACT_APP_NEO_PROJECT_BASE_URL;

	return {
		login,
		logout,
		edit,
	};

	// Login the kennel
	function login(data) {
		return axios.post(`${baseURL}api/auth/login/`, data).then((res) => {
			// Registering the account and tokens in the store
			setKennelData(res.data);
			dispatch(setKennel(res.data.user.id));
			navigate("/KennelAccount");
		});
	}

	// Edit the kennel
	function edit(data, kennelId) {
		return axiosService
			.patch(`${baseURL}api/kennel/${kennelId}/`, data, {
				headers: {
					"Content-Type": "application/json", // Explicitly set for JSON requests
				},
			})
			.then((res) => {
				console.log(res, "RES");
				// Registering the account in the store
				localStorage.setItem(
					"auth",
					JSON.stringify({
						access: getAccessToken(),
						refresh: getRefreshToken(),
						kennel: res.data,
					})
				);
			});
	}

	// Logout the kennel
	function logout() {
		return axiosService
			.post(`${baseURL}/auth/logout/`, { refresh: getRefreshToken() })
			.then(() => {
				localStorage.removeItem("auth");
				navigate("/login");
			});
	}
}

// Get the kennel
function getKennel() {
	const auth = JSON.parse(localStorage.getItem("auth")) || null;
	if (auth) {
		return auth.kennel;
	} else {
		return null;
	}
}

// Get the access token
function getAccessToken() {
	const auth = JSON.parse(localStorage.getItem("auth"));
	return auth.access;
}

// Get the refresh token
function getRefreshToken() {
	const auth = JSON.parse(localStorage.getItem("auth"));
	return auth.refresh;
}

// Set the access, token and kennel property
function setKennelData(data) {
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
