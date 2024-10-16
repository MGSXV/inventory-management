import { IsAlphanumeric, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {

	@IsNotEmpty({ message: 'USER.UPDATE.ID_REQUIRED' })
	id: string;

	@IsString({ message: 'USER.UPDATE.USERNAME_MUST_BE_STRING' })
	@IsAlphanumeric("en-US", { message: 'USER.UPDATE.USERNAME_MUST_BE_ALPHANUMERIC' })
	@MinLength(4, { message: 'USER.UPDATE.USERNAME_MIN_LENGTH' })
	@MaxLength(20, { message: 'USER.UPDATE.USERNAME_MAX_LENGTH' })
	username: string;

	@IsString({ message: 'USER.UPDATE.PASSWORD_MUST_BE_STRING' })
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}, { message: 'USER.UPDATE.PASSWORD_WEAK' })
	@MinLength(8, { message: 'USER.UPDATE.PASSWORD_MIN_LENGTH' })
	password: string;

	@IsString({ message: 'USER.UPDATE.FIRST_NAME_MUST_BE_STRING' })
	first_name: string;

	@IsString({ message: 'USER.UPDATE.LAST_NAME_MUST_BE_STRING' })
	last_name: string;
}