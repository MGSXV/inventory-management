import { axios_private } from "@/config/api"
import { useAuth, useRefreshToken } from "."
import { useEffect } from "react"

export const useAxiosPrivate = () => {
	const refresh = useRefreshToken()
	const { user } = useAuth()

	useEffect(() => {
	
		const request_intercept = axios_private.interceptors.request.use(
			config => {
				config.withCredentials = true
				return config
			},
			error => Promise.reject(error)
		)
		const response_intercept = axios_private.interceptors.response.use(
			response => response,
			async error => {
				const prev_request = error?.config
				if ((error?.response?.status === 403 || error?.response?.status === 401) && !prev_request?.sent) {
					prev_request.sent = true
					refresh()
					return axios_private(prev_request)
				}
				return Promise.reject(error)
			}
		)

		return () => {
			axios_private.interceptors.request.eject(request_intercept)
			axios_private.interceptors.response.eject(response_intercept)
		}
	}, [user, refresh])

	return axios_private
}
