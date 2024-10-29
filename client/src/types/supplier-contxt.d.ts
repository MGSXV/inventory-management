export interface ISupplier {
	id: string
	name: string
	description: string
	image_url: string
	created_at: string
	updated_at: string
	created_by_id: string
}

export type TSupplierContext = {
	suppliers: ISupplier[],
	setSuppliers: React.Dispatch<React.SetStateAction<ISupplier[]>>,
}

export interface ISupplierInfo {
	name: string
	description?: string
	picture?: File
}
