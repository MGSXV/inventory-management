import { IsNotEmpty, IsString } from 'class-validator';
import { DEPOT } from 'src/common/errors';

export class InviteUserDto {
	
	@IsString({ message: `DEPOT.UPDATE.${DEPOT.UPDATE.MUST_BE_STRING}` })
	@IsNotEmpty({ message: `DEPOT.UPDATE.${DEPOT.UPDATE.REQUIRED}` })
	userId: string;
}
