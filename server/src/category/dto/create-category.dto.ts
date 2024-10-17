import { IsAscii, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { CATEGORY } from "src/common/errors";

export class CreateCategoryDto {

	@IsString({ message: `CATEGORY.NAME.${CATEGORY.NAME.MUST_BE_STRING}` })
	@IsNotEmpty({ message: `CATEGORY.NAME.${CATEGORY.NAME.REQUIRED}` })
	@MinLength(3, { message: `CATEGORY.NAME.${CATEGORY.NAME.MIN_LENGTH}` })
	@MaxLength(20, { message: `CATEGORY.NAME.${CATEGORY.NAME.MAX_LENGTH}` })
	name: string;

	@IsOptional()
	@IsString({ message: `CATEGORY.DESCRIPTION.${CATEGORY.DESCRIPTION.MUST_BE_STRING}` })
	@MinLength(3, { message: `CATEGORY.DESCRIPTION.${CATEGORY.DESCRIPTION.MIN_LENGTH}` })
	@MaxLength(20, { message: `CATEGORY.DESCRIPTION.${CATEGORY.NAME.MAX_LENGTH}` })
	description?: string;

	@IsOptional()
	@IsUUID(undefined, { message: `CATEGORY.PARENT_ID.${CATEGORY.PARENT.INVALID}` })
	parent_id?: string;
}
