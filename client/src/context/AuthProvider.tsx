import React, { createContext, useEffect, useState } from "react";
import { ICurrentUser, TAuthContext } from "@/types";

const AuthContext = createContext<TAuthContext>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<ICurrentUser | null>(null);
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const stored_user = localStorage.getItem('user')
		if (stored_user)
			setUser(JSON.parse(stored_user))
		setIsLoading(false)
	}, [])

	const handleSetUser = (userData: ICurrentUser) => {
		setUser(userData);
		localStorage.setItem('user', JSON.stringify(userData));
	};

	const logout = () => {
		setUser(null)
		localStorage.removeItem('user')
	}

	return (
		<AuthContext.Provider value={{user, setUser, logout, handleSetUser, isLoading}}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext };