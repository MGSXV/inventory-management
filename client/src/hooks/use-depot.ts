import useAxiosPrivate from "./user-axios-private";

export const useDepot = () => {
	
	const axios_private = useAxiosPrivate()

	const get_depot = async () => {

		try {
			const response = await axios_private.get('depot')
			return response.data
		} catch (error) {
			console.log('Error getting depot');
		}
	}

  return get_depot;
}