export const SUPPLIER = {
	CREATE: {
		NAME: {
			MUST_BE_STRING: 'MUST_BE_STRING',
			REQUIRED: 'REQUIRED',
			MIN_LENGTH: 'MIN_LENGTH',
			MAX_LENGTH: 'MAX_LENGTH',
		},
		DESCRIPTION: {
			MUST_BE_STRING: 'MUST_BE_STRING',
			MAX_LENGTH: 'MAX_LENGTH',
		},
		IMAGE_URL: {
			NO_FILE_UPLOADED: 'NO_FILE_UPLOADED',
			FILE_IS_TOO_LARGE: 'FILE_IS_TOO_LARGE',
			INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
			UPLOAD_ERROR: 'UPLOAD_ERROR',
		},
		GENERAL: 'GENERAL',
	},
	FIND_ALL: {
		NO_SUPPLIER_FOUND: 'NO_SUPPLIER_FOUND',
	},
	FIND_ONE: {
		NO_SUPPLIER_FOUND: 'NO_SUPPLIER_FOUND',
	},
	REMOVE: {
		NO_SUPPLIER_FOUND: 'NO_SUPPLIER_FOUND',
		GENERAL: 'GENERAL',
	},
	UPDATE: {
		NO_SUPPLIER_FOUND: 'NO_SUPPLIER_FOUND',
		GENERAL: 'GENERAL',
		USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
		INVALID_USER: 'INVALID_USER',
		MUST_BE_STRING: 'MUST_BE_STRING',
		REQUIRED: 'REQUIRED',
		INVALID_ID: 'INVALID_ID',
	}
}