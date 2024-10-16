import { IsAlphanumeric, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { SIGNUP } from "src/common/errors";

export class AuthDto {

	@IsString({ message: `SIGNUP.USERNAME.${SIGNUP.USERNAME.MUST_BE_STRING}` })
	@IsAlphanumeric("en-US", { message: `SIGNUP.USERNAME.${SIGNUP.USERNAME.MUST_BE_ALPHANUMERIC}` })
	@MinLength(4, { message: `SIGNUP.USERNAME.${SIGNUP.USERNAME.MIN_LENGTH}` })
	@MaxLength(20, { message: `SIGNUP.USERNAME.${SIGNUP.USERNAME.MAX_LENGTH}` })
	@IsNotEmpty({ message: `SIGNUP.USERNAME.${SIGNUP.USERNAME.REQUIRED}` })
	username: string;

	@IsString({ message: `SIGNUP.PASSWORD.${SIGNUP.PASSWORD.MUST_BE_STRING}` })
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}, { message: `SIGNUP.PASSWORD.${SIGNUP.PASSWORD.WEAK}` })
	@MinLength(8, { message: `SIGNUP.PASSWORD.${SIGNUP.PASSWORD.MIN_LENGTH}` })
	@IsNotEmpty({ message: `SIGNUP.PASSWORD.${SIGNUP.PASSWORD.REQUIRED}` })
	password: string;

	@IsString({ message: `SIGNUP.FIRST_NAME.${SIGNUP.FIRST_NAME.MUST_BE_STRING}` })
	@IsNotEmpty({ message: `SIGNUP.FIRST_NAME.${SIGNUP.FIRST_NAME.REQUIRED}` })
	first_name: string;

	@IsString({ message: `SIGNUP.LAST_NAME.${SIGNUP.LAST_NAME.MUST_BE_STRING}` })
	@IsNotEmpty({ message: `SIGNUP.LAST_NAME.${SIGNUP.LAST_NAME.REQUIRED}` })
	last_name: string;
}