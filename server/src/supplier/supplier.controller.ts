import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SUPPLIER } from 'src/common/errors';
import { GetCurrentUserID } from 'src/common/decorators';
import { SUPPLIER_IMG_DIR } from 'src/common/conf';

const MAX_FILE_SIZE = 1024 * 1024 * 10;

@Controller('supplier')
export class SupplierController {
	constructor(
		private readonly supplierService: SupplierService,
		private readonly uploadFileServive: FileUploadService
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('file', {
		limits: { fileSize: MAX_FILE_SIZE },
		fileFilter: (req, file, cb) => {
			if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
				cb(null, true);
			} else {
				cb(new BadRequestException(`SUPPLIER.CREATE.IMAGE_URL.${SUPPLIER.CREATE.IMAGE_URL.INVALID_FILE_TYPE}`), false);
			}
		}
	}))
	async create(
		@Body() createSupplierDto: CreateSupplierDto,
		@GetCurrentUserID() userID: string,
		@UploadedFile() file: Express.Multer.File
	) {
		try {
			if (file)
				createSupplierDto.file = await this.uploadFileServive.uploadFile(file, SUPPLIER_IMG_DIR);
			else
				createSupplierDto.file = undefined;
			return await this.supplierService.create(createSupplierDto, userID);
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
			return await this.supplierService.findAll(userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.supplierService.findOne(+id);
	}

	@Patch(':id')
	@UseInterceptors(FileInterceptor('file', {
		limits: { fileSize: MAX_FILE_SIZE },
		fileFilter: (req, file, cb) => {
			if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
				cb(null, true);
			} else {
				cb(new BadRequestException(`SUPPLIER.CREATE.IMAGE_URL.${SUPPLIER.CREATE.IMAGE_URL.INVALID_FILE_TYPE}`), false);
			}
		}
	}))
	async update(
		@Param('id') id: string,
		@Body() updateSupplierDto: UpdateSupplierDto,
		@GetCurrentUserID() userID: string,
		@UploadedFile() file: Express.Multer.File
	) {
		if (file)
			updateSupplierDto.file = await this.uploadFileServive.uploadFile(file, SUPPLIER_IMG_DIR);
		else
			updateSupplierDto.file = undefined;
		return await this.supplierService.update(id, userID, updateSupplierDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string, @GetCurrentUserID() userID: string) {
		try {
			return await this.supplierService.remove(id, userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}
}
