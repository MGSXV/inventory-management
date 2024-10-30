import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { GetCurrentUserID } from 'src/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { CATEGORY } from 'src/common/errors';
import { CATEGORY_IMG_DIR } from 'src/common/conf';

const MAX_FILE_SIZE = 1024 * 1024 * 10;

@Controller('category')
export class CategoryController {
	constructor(
		private readonly categoryService: CategoryService,
		private readonly uploadFileServive: FileUploadService
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('file', {
		limits: { fileSize: MAX_FILE_SIZE },
		fileFilter: (req, file, cb) => {
			if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
				cb(null, true);
			} else {
				cb(new BadRequestException(`SUPPLIER.CREATE.IMAGE_URL.${CATEGORY.CREATE.IMAGE_URL.INVALID_FILE_TYPE}`), false);
			}
		}
	}))
	async create(
		@Body() createCategoryDto: CreateCategoryDto,
		@GetCurrentUserID() userID: string,
		@UploadedFile() file: Express.Multer.File
	) {
		try {
			if (file)
				createCategoryDto.file = await this.uploadFileServive.uploadFile(file, CATEGORY_IMG_DIR);
			else
				createCategoryDto.file = undefined;
			return await this.categoryService.create(createCategoryDto, userID);
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
			return await this.categoryService.findAll(userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
			
		}
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoryService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
		return this.categoryService.update(+id, updateCategoryDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoryService.remove(+id);
	}
}
