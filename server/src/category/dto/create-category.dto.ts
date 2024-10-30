import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CATEGORY } from "src/common/errors";

export class CreateCategoryDto {

	@IsString({ message: `CATEGORY.CREATE.NAME.${CATEGORY.NAME.MUST_BE_STRING}` })
	@IsNotEmpty({ message: `CATEGORY.CREATE.NAME.${CATEGORY.NAME.REQUIRED}` })
	@MinLength(4, { message: `CATEGORY.CREATE.NAME.${CATEGORY.NAME.MIN_LENGTH}` })
	@MaxLength(20, { message: `CATEGORY.CREATE.NAME.${CATEGORY.NAME.MAX_LENGTH}` })
	name: string;

	@IsOptional()
	@IsString({ message: `CATEGORY.CREATE.DESCRIPTION.${CATEGORY.DESCRIPTION.MUST_BE_STRING}` })
	@MaxLength(200, { message: `CATEGORY.CREATE.DESCRIPTION.${CATEGORY.DESCRIPTION.MAX_LENGTH}` })
	description?: string;

	@IsOptional()
	@IsString()
	parent?: string;

	@IsOptional()
	@IsString()
	depot_id: string;

	@IsOptional()
	file?: string;
}
