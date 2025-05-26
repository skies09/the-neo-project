import React, { createContext, useContext, useEffect, useState } from "react";
import { getKennel } from "./hooks/kennel.actions";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [kennel, setKennel] = useState(null);

	useEffect(() => {
		const storedKennel = getKennel();
		setKennel(storedKennel);
	}, []);

	const login = (kennelData) => {
		setKennel(kennelData);
	};

	const logout = () => {
		localStorage.removeItem("auth");
		setKennel(null);
	};

	return (
		<AuthContext.Provider
			value={{ isLoggedIn: !!kennel, kennel, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
