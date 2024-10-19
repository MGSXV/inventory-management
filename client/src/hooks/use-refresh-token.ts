import { axios } from "@/config/api";
import { useAuth } from ".";
import { useEffect } from "react";

const REFRESH_ENDPOINT = 'auth/refresh'

export const useRefreshToken = () => {

	const { user, setUser } = useAuth()

	useEffect(() => {
		console.log('refreshed ---->', user)
	}, [user])

	const refresh = () => {
		axios.post(REFRESH_ENDPOINT, {}, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user?.refresh_token}`, // Include the access token as a Bearer token
				withCredentials: true
			}
		}).then(response => {
			user && setUser({
				...user,
				refresh_token: response.data.refresh_token,
				access_token: response.data.refresh_token
			})
		}).catch(error => {
			console.log('Error refreshing token:', error.response ? error.response.data : error.message);
		}).finally()

	}
	return refresh
}