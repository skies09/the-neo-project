import React, { createContext, useContext, useEffect, useState } from "react";
import type { Kennel } from "./services/api";
import { getKennel } from "./hooks/kennel.actions";

type AuthContextType = {
	isLoggedIn: boolean;
	kennel: Kennel | null;
	login: (kennelData: Kennel) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [kennel, setKennel] = useState<Kennel | null>(null);

	useEffect(() => {
		const storedKennel = getKennel();
		setKennel(storedKennel);
	}, []);

	/** Log out other tabs when `auth` is cleared (e.g. refresh failure). */
	useEffect(() => {
		const onStorage = (e: StorageEvent) => {
			if (e.key === "auth" && e.newValue === null) {
				setKennel(null);
			}
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);

	const login = (kennelData: Kennel) => {
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

export function useAuth(): AuthContextType {
	const ctx = useContext(AuthContext);
	if (ctx === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return ctx;
}
