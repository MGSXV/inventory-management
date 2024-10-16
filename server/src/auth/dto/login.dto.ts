import { IsAlphanumeric, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class LoginDto {

	@IsString({ message: 'LOGIN.USERNAME_MUST_BE_STRING' })
	@IsAlphanumeric("en-US", { message: 'LOGIN.USERNAME_MUST_BE_ALPHANUMERIC' })
	@MinLength(4, { message: 'LOGIN.USERNAME_MIN_LENGTH' })
	@MaxLength(20, { message: 'LOGIN.USERNAME_MAX_LENGTH' })
	@IsNotEmpty({ message: 'LOGIN.USERNAME_REQUIRED' })
	username: string;

	@IsString({ message: 'LOGIN.PASSWORD_MUST_BE_STRING' })
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}, { message: 'LOGIN.PASSWORD_WEAK' })
	@MinLength(8, { message: 'LOGIN.PASSWORD_MIN_LENGTH' })
	@IsNotEmpty({ message: 'LOGIN.PASSWORD_REQUIRED' })
	password: string;
}