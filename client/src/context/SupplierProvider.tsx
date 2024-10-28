import { ISupplier, TSupplierContext } from "@/types";
import { createContext, useContext, useState } from "react";

const SupplierContext = createContext<TSupplierContext>({ suppliers: [], setSuppliers: () => {} });

export const SupplierProvider = ({ children }: { children: React.ReactNode }) => {
	const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

	return (
		<SupplierContext.Provider value={{ suppliers, setSuppliers }}>
			{children}
		</SupplierContext.Provider>
	);
}

export const useSupplier = (): TSupplierContext => useContext(SupplierContext);