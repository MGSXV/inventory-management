import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { SUPPLIER } from "src/common/errors";

export class CreateSupplierDto {
	@IsString({ message: `SUPPLIER.CREATE.NAME.${SUPPLIER.CREATE.NAME.MUST_BE_STRING}` })
	@IsNotEmpty({ message: `SUPPLIER.CREATE.NAME.${SUPPLIER.CREATE.NAME.REQUIRED}` })
	@MinLength(4, { message: `SUPPLIER.CREATE.NAME.${SUPPLIER.CREATE.NAME.MIN_LENGTH}` })
	@MaxLength(20, { message: `SUPPLIER.CREATE.NAME.${SUPPLIER.CREATE.NAME.MAX_LENGTH}` })
	name: string;

	@IsOptional()
	@IsString({ message: `SUPPLIER.CREATE.DESCRIPTION.${SUPPLIER.CREATE.DESCRIPTION.MUST_BE_STRING}` })
	@MaxLength(200, { message: `SUPPLIER.CREATE.DESCRIPTION.${SUPPLIER.CREATE.DESCRIPTION.MAX_LENGTH}` })
	description?: string;

	@IsString()
	@IsNotEmpty({ message: `SUPPLIER.CREATE.DEPOT_ID.${SUPPLIER.CREATE.DEPOT_ID.REQUIRED}` })
	depot_id: string;

	@IsOptional()
	file?: string;
}
