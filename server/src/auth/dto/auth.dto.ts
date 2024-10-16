import { IsAlphanumeric, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class AuthDto {

	@IsString({ message: 'SIGNUP.USERNAME_MUST_BE_STRING' })
	@IsAlphanumeric("en-US", { message: 'SIGNUP.USERNAME_MUST_BE_ALPHANUMERIC' })
	@MinLength(4, { message: 'SIGNUP.USERNAME_MIN_LENGTH' })
	@MaxLength(20, { message: 'SIGNUP.USERNAME_MAX_LENGTH' })
	@IsNotEmpty({ message: 'SIGNUP.USERNAME_REQUIRED' })
	username: string;

	@IsString()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}, { message: 'SIGNUP.PASSWORD_WEAK' })
	@MinLength(8, { message: 'SIGNUP.PASSWORD_MIN_LENGTH' })
	@IsNotEmpty({ message: 'SIGNUP.PASSWORD_REQUIRED' })
	password: string;

	@IsString({ message: 'SIGNUP.FIRST_NAME_MUST_BE_STRING' })
	@IsNotEmpty({ message: 'SIGNUP.FIRST_NAME_REQUIRED' })
	first_name: string;

	@IsString({ message: 'SIGNUP.LAST_NAME_MUST_BE_STRING' })
	@IsNotEmpty({ message: 'SIGNUP.LAST_NAME_REQUIRED' })
	last_name: string;
}