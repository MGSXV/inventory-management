export interface IDepot {
	id: string
	name: string
	description: string
	image_url: string
	created_at: string
	updated_at: string
	created_by_id: string
}

export type TDepotContext = {
	depots: IDepot[],
	setDepots: React.Dispatch<React.SetStateAction<IDepot[]>>,
}