import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EState } from '@prisma/client';
import { CATEGORY } from 'src/common/errors';

@Injectable()
export class CategoryService {

	constructor(private prisma: PrismaService) {}

	async create(createCategoryDto: CreateCategoryDto, userID: string) {
		try {
			if (createCategoryDto.parent) {
				const is_second_level = await this.hasParentCategory(createCategoryDto.parent);
				if (is_second_level) {
					throw new Error('CATEGORY.CREATE.PARENT_CATEGORY');
				}
			}
			const categories = this.prisma.category.create({
				data: {
					name: createCategoryDto.name,
					description: createCategoryDto.description,
					image_url: createCategoryDto.file || null,
					parentCategoryId: createCategoryDto.parent || null,
					created_by_id: userID,
					state: EState.ACTIVE
				},
				select: {
					id: true,
					name: true,
					description: true,
					image_url: true,
					parentCategoryId: true,
					created_by_id: true,
					parentCategory: {
						select: {
							id: true,
							name: true,
							description: true,
							image_url: true,
							parentCategoryId: true,
							created_by_id: true,
						}
					}
				}
			}).then(async () => await this.findAll(userID)).catch(() => {throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.GENERAL}`)});
			return categories
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async findAll(user_id: string) {
		try {
			const categories = await this.prisma.category.findMany({
				where: {
					created_by_id: user_id,
					state: EState.ACTIVE,
					parentCategoryId: null
				},
				select: {
					id: true,
					name: true,
					description: true,
					image_url: true,
					parentCategoryId: true,
					created_by_id: true,
					childCategories: {
						select: {
							id: true,
							name: true,
							description: true,
							image_url: true,
							parentCategoryId: true,
							created_by_id: true,
						}
					}
				}
			});
			return categories;
		} catch (error) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.FIND.GENERAL}`);
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} category`;
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`;
	}

	remove(id: number) {
		return `This action removes a #${id} category`;
	}

	private async hasParentCategory(id: string) {
		const category = await this.prisma.category.findFirst({
			where: {
				id: id
			}
		});
		return category?.parentCategoryId ? true : false;
	}
}
