import { IsAlphanumeric, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {

	@IsNotEmpty()
	@IsNumber()
	id: string;

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

	refresh_token: string;
}