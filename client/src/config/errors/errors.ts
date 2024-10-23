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
	'SIGNUP.USERNAME.REQUIRED': 'Username is required',
	'SIGNUP.USERNAME.MIN_LENGTH': 'Username is too short',
	'SIGNUP.USERNAME.MUST_BE_ALPHANUMERIC': 'Username must be alphanumeric',
	'SIGNUP.PASSWORD.REQUIRED': 'Password is required',
	'SIGNUP.PASSWORD.MIN_LENGTH': 'Password is too short',
	'SIGNUP.PASSWORD.WEAK': 'Password is weak',
	'SIGNUP.FIRST_NAME.REQUIRED': 'First name is required',
	'SIGNUP.FIRST_NAME.MUST_BE_STRING': 'First name must be a string',
	'SIGNUP.LAST_NAME.REQUIRED': 'Last name is required',
	'SIGNUP.LAST_NAME.MUST_BE_STRING': 'Last name must be a string',
	'SIGNUP.USERNAME.ALREADY_EXISTS': 'Username already exists',
	'DEPOT.CREATE.NAME.MUST_BE_STRING': 'Name must be a string',
	'DEPOT.CREATE.NAME.REQUIRED': 'Name is required',
	'DEPOT.CREATE.NAME.MIN_LENGTH': 'Name is too short',
	'DEPOT.CREATE.NAME.MAX_LENGTH': 'Name is too long',
	'DEPOT.CREATE.DESCRIPTION.MUST_BE_STRING': 'Description must be a string',
	'DEPOT.CREATE.DESCRIPTION.MAX_LENGTH': 'Description is too long',
	'DEPOT.CREATE.IMAGE_URL.NO_FILE_UPLOADED': 'No file uploaded',
	'DEPOT.CREATE.IMAGE_URL.FILE_IS_TOO_LARGE': 'File is too large',
	'DEPOT.CREATE.IMAGE_URL.INVALID_FILE_TYPE': 'Invalid file type',
	'DEPOT.CREATE.IMAGE_URL.UPLOAD_ERROR': 'Upload error',
	'DEPOT.CREATE.GENERAL': 'General error',
	'DEPOT.FIND_ALL.NO_DEPOT_FOUND': 'No depot found',
	'DEPOT.FIND_ONE.NO_DEPOT_FOUND': 'No depot found',
	'DEPOT.REMOVE.NO_DEPOT_FOUND': 'No depot found',
	'DEPOT.REMOVE.GENERAL': 'Unknown error',
	'DEPOT.UPDATE.NO_DEPOT_FOUND': 'No depot found',
	'DEPOT.UPDATE.GENERAL': 'General error',
	'DEPOT.UPDATE.USER_ALREADY_EXISTS': 'User already exists',
	'DEPOT.UPDATE.INVALID_USER': 'Invalid user',
	'DEPOT.UPDATE.MUST_BE_STRING': 'Must be a string',
	'DEPOT.UPDATE.REQUIRED': 'Required',
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
	return ERRORS[error_message as keyof typeof ERRORS] ? ERRORS[error_message as keyof typeof ERRORS] : 'Unknown error'
}
