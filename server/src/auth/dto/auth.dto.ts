import { IsAlphanumeric, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class AuthDto {

	@IsString()
	@IsAlphanumeric()
	@MinLength(4)
	@MaxLength(20)
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	@MinLength(8)
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	first_name: string;

	@IsString()
	@IsNotEmpty()
	last_name: string;
}