export const ERRORS = {
	'SIGNIN.USERNAME.MUST_BE_STRING': 'Username must be a string',
	'SIGNIN.USERNAME.MUST_BE_ALPHANUMERIC': 'Username must be alphanumeric',
	'SIGNIN.USERNAME.MIN_LENGTH': 'Username is too short',
	'SIGNIN.USERNAME.MAX_LENGTH': 'Username is too long',
	'SIGNIN.USERNAME.REQUIRED': 'Username is required',
	'SIGNIN.USERNAME.NOT_FOUND': 'Username not found',
	'SIGNIN.PASSWORD.MUST_BE_STRING': 'Password must be a string',
	'SIGNIN.PASSWORD.WEAK': 'Password is weak',
	'SIGNIN.PASSWORD.MIN_LENGTH': 'Password is too short',
	'SIGNIN.PASSWORD.REQUIRED': 'Password is required',
	'SIGNIN.PASSWORD.INVALID': 'Password is invalid',
}

export function getErrorMessage(data: any) {
	const response = data
	let error_message = ""
	if (response.message) {
		if (Array.isArray(response.message)) {
			error_message = response.message[0]
		} else {
			error_message = response.message
		}
	} else {
		error_message = response.error
	}
	return ERRORS[error_message as keyof typeof ERRORS]
}
