import { IDepot, TDepotContext } from "@/types";
import { createContext, useContext, useState } from "react";

const DepotContext = createContext<TDepotContext>({ depots: [], setDepots: () => {} });

export const DepotProvider = ({ children }: { children: React.ReactNode }) => {
	const [depots, setDepots] = useState<IDepot[]>([]);

	return (
		<DepotContext.Provider value={{ depots, setDepots }}>
			{children}
		</DepotContext.Provider>
	);
}

export const useDepot = (): TDepotContext => useContext(DepotContext);