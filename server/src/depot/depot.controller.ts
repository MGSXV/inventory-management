import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { DepotService } from './depot.service';
import { CreateDepotDto, InviteUserDto, UpdateDepotDto } from './dto';
import { GetCurrentUserID } from 'src/common/decorators';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { DEPOT } from 'src/common/errors';
import { DEPOT_IMG_DIR } from 'src/common/conf';

const MAX_FILE_SIZE = 1024 * 1024 * 10;

@Controller('depot')
export class DepotController {
	constructor(
		private readonly depotService: DepotService,
		private readonly uploadFileServive: FileUploadService
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('file', {
		limits: { fileSize: MAX_FILE_SIZE },
		fileFilter: (req, file, cb) => {
			if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
				cb(null, true);
			} else {
				cb(new BadRequestException(`DEPOT.CREATE.IMAGE_URL.${DEPOT.CREATE.IMAGE_URL.INVALID_FILE_TYPE}`), false);
			}
		}
	}))
	async create(
		@Body() createDepotDto: CreateDepotDto,
		@GetCurrentUserID() userID: string,
		@UploadedFile() file: Express.Multer.File
	) {
		try {
			if (file)
				createDepotDto.file = await this.uploadFileServive.uploadFile(file, DEPOT_IMG_DIR);
			return await this.depotService.create(createDepotDto, userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Patch(':id/invite')
	async addUser(@Param('id') id: string, @GetCurrentUserID() userID: string,@Body() invite: InviteUserDto) {
		console.log(invite)
		try {
			return await this.depotService.addUser(id, invite.userId, userID);
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
