// src/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getKennel } from "./hooks/kennel.actions";

type AuthContextType = {
	isLoggedIn: boolean;
	kennel: any;
	login: (kennelData: any) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [kennel, setKennel] = useState<any>(null);

	useEffect(() => {
		const storedKennel = getKennel();
		setKennel(storedKennel);
	}, []);

	const login = (kennelData: any) => {
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
