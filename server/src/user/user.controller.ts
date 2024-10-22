import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetCurrentUserID } from 'src/common/decorators';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService
	) {}

	@Get(':id')
	async findOneByID(@Param('id') id: string) {
		return await this.userService.findOneByID(id);
	}

	@Get('username/:username')
	async findByUsername(username: string) {
		return await this.userService.findByUsername(username);
	}

	@Get('all')
	async findAll(@GetCurrentUserID() use_id: string) {
		try {
			return await this.userService.findAll(use_id);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}
}
