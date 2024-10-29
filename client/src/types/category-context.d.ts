export interface ICategory {

}

export type TCategoryContext = {
	categories: ICategory[],
	setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>,
}

export interface ICategoryInfo {
	name: string
	description?: string
	picture?: File
}