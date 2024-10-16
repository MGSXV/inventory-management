import { IsAlphanumeric, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { SIGNIN } from "src/common/errors";

export class LoginDto {

	@IsString({ message: `SIGNIN.USERNAME.${SIGNIN.USERNAME.MUST_BE_STRING}` })
	@IsAlphanumeric("en-US", { message: `SIGNIN.USERNAME.${SIGNIN.USERNAME.MUST_BE_ALPHANUMERIC}` })
	@MinLength(4, { message: `SIGNIN.USERNAME.${SIGNIN.USERNAME.MAX_LENGTH}` })
	@MaxLength(20, { message: `SIGNIN.USERNAME.${SIGNIN.USERNAME.MAX_LENGTH}` })
	@IsNotEmpty({ message: `SIGNIN.USERNAME.${SIGNIN.USERNAME.REQUIRED}` })
	username: string;

	@IsString({ message: `SIGNIN.PASSWORD.${SIGNIN.PASSWORD.MUST_BE_STRING}` })
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}, { message: `SIGNIN.PASSWORD.${SIGNIN.PASSWORD.WEAK}` })
	@MinLength(8, { message: `SIGNIN.PASSWORD.${SIGNIN.PASSWORD.MIN_LENGTH}` })
	@IsNotEmpty({ message: `SIGNIN.PASSWORD.${SIGNIN.PASSWORD.REQUIRED}` })
	password: string;
}