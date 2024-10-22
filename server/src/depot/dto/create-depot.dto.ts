import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { DEPOT } from "src/common/errors";

export class CreateDepotDto {

	@IsString({ message: `DEPOT.CREATE.NAME.${DEPOT.CREATE.NAME.MUST_BE_STRING}` })
	@IsNotEmpty({ message: `DEPOT.CREATE.NAME.${DEPOT.CREATE.NAME.REQUIRED}` })
	@MinLength(4, { message: `DEPOT.CREATE.NAME.${DEPOT.CREATE.NAME.MIN_LENGTH}` })
	@MaxLength(20, { message: `DEPOT.CREATE.NAME.${DEPOT.CREATE.NAME.MAX_LENGTH}` })
	name: string;

	@IsOptional()
	@IsString({ message: `DEPOT.CREATE.DESCRIPTION.${DEPOT.CREATE.DESCRIPTION.MUST_BE_STRING}` })
	@MaxLength(200, { message: `DEPOT.CREATE.DESCRIPTION.${DEPOT.CREATE.DESCRIPTION.MAX_LENGTH}` })
	description?: string;

	@IsOptional()
	file?: string;
}
