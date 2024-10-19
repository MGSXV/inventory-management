import { axios } from "@/config/api";
import { useAuth } from ".";

const REFRESH_ENDPOINT = 'auth/refresh'

export const useRefreshToken = () => {

	const { user, handleSetUser, logout } = useAuth()

	const refresh = () => {
		axios.post(REFRESH_ENDPOINT, {}, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true
		}).then(_response => {
			user && handleSetUser({
				...user
			})
		}).catch(error => {
			logout()
			console.log('Error refreshing token:', error.response ? error.response.data : error.message);
		}).finally()

	}
	return refresh
}