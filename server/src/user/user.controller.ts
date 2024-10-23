import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetCurrentUserID } from 'src/common/decorators';
import { use } from 'passport';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService
	) {}

	@Get()
	async findCurrent(@GetCurrentUserID() user_id: string) {
		try {
			const results = await this.userService.findOneByID(user_id);
			return results ? {
				id: results.id,
				username: results.username,
				first_name: results.first_name,
				last_name: results.last_name,
				avatar_url: results.avatar_url
			} : null
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Get('username/:username')
	async findByUsername(username: string) {
		return await this.userService.findByUsername(username);
	}

	@Get('all')
	async findAll(@GetCurrentUserID() user_id: string) {
		try {
			return await this.userService.findAll(user_id);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Get(':id')
	async findOneByID(@Param('id') id: string) {
		return await this.userService.findOneByID(id);
	}
}
