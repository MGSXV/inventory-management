import { ICategory, TCategoryContext } from "@/types";
import { createContext, useContext, useState } from "react";

const CategoryContext = createContext<TCategoryContext>({ categories: [], setCategories: () => {} });

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {

	const [categories, setCategories] = useState<ICategory[]>([]);

	return (
		<CategoryContext.Provider value={{ categories, setCategories }}>
			{children}
		</CategoryContext.Provider>
	);
}

export const useCategory = (): TCategoryContext => useContext(CategoryContext);