import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCurrentUserID } from 'src/common/decorators';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post(':depot_id')
	async create(@Param('depot_id') depot_id: string, @Body() createCategoryDto: CreateCategoryDto, @GetCurrentUserID() userID: string) {
		try {
			return await this.categoryService.create(depot_id, userID, createCategoryDto);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Get(':depot_id')
	async findAll(@Param('depot_id') depot_id: string, @GetCurrentUserID() userID: string) {
		try {
			return await this.categoryService.findAll(userID, depot_id);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Get(':depot_id/:id')
	async findOne(@Param('id') id: string, @Param('depot_id') depot_id: string, @GetCurrentUserID() userID: string) {
		try {
			return await this.categoryService.findOne(id, depot_id, userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Get(':depot_id/:id/children')
	async findChildren(@Param('id') id: string, @Param('depot_id') depot_id: string, @GetCurrentUserID() userID: string) {
		try {
			return await this.categoryService.findChildren(id, depot_id, userID);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Patch(':depot_id/:id')
	async update(@Param('id') id: string, @Param('depot_id') depot_id: string, @GetCurrentUserID() user_id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
		return await this.categoryService.update(id, depot_id, user_id, updateCategoryDto);
	}

	@Delete(':depot_id/:id')
	async remove(@Param('id') id: string, @Param('depot_id') depot_id: string, @GetCurrentUserID() user_id: string) {
		return this.categoryService.remove(id, depot_id, user_id);
	}
}
