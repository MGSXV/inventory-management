import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DepotService } from './depot.service';
import { CreateDepotDto, UpdateDepotDto } from './dto';
import { GetCurrentUserID } from 'src/common/decorators';


@Controller('depot')
export class DepotController {
	constructor(private readonly depotService: DepotService) {}

	@Post()
	async create(@Body() createDepotDto: CreateDepotDto, @GetCurrentUserID() userID: string) {
		try {
			return await this.depotService.create(createDepotDto, userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Get()
	async findAll(@GetCurrentUserID() userID: string) {
		try {
			return await this.depotService.findAll(userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: string, @GetCurrentUserID() userID: string) {
		try {
			return await this.depotService.findOne(id, userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
		
	}

	@Patch(':id')
	async update(@Param('id') id: string, @GetCurrentUserID() userID: string, @Body() updateDepotDto: UpdateDepotDto) {
		try {
			return await this.depotService.update(id, userID, updateDepotDto);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string, @GetCurrentUserID() userID: string) {
		try {
			return await this.depotService.remove(id, userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Patch(':id/add-user/:user_id')
	async addUser(@Param('id') id: string, @Param('user_id') user_id: string, @GetCurrentUserID() userID: string) {
		try {
			return await this.depotService.addUser(id, user_id, userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Patch(':id/remove-user/:user_id')
	async removeUser(@Param('id') id: string, @Param('user_id') user_id: string, @GetCurrentUserID() userID: string) {
		try {
			return await this.depotService.removeUser(id, user_id, userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}
}
