export interface ICurrentUser {
	access_token: string
	refresh_token: string
	user: {
		id: string
		username: string
		first_name: string
		last_name: string
		avatar: string
	}
}