import React, { createContext, useState } from "react";
import { ICurrentUser, TAuthContext } from "@/types";

const AuthContext = createContext<TAuthContext>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<ICurrentUser | null>(null);

	return (
		<AuthContext.Provider value={{user, setUser}}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext };