export interface ICategory {
	id: string,
	name: string,
	description?: string,
	image_url?: string,
	parentCategoryId: string | null,
	childCategories: ICategory[],
	created_by_id: string,
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