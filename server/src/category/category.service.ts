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
			let depot_id = createCategoryDto.depot_id || null;
			if (createCategoryDto.parent) {
				const parent = await this.findOne(createCategoryDto.parent, userID);
				if (parent && parent.parentCategory) {
					throw new Error('CATEGORY.CREATE.PARENT_CATEGORY');
				} else if (parent && !parent.parentCategory) {
					depot_id = parent.depot.id;
				}
			}
			if (!depot_id) {
				throw new Error('CATEGORY.CREATE.DEPOT_ID');
			}
			const categories = this.prisma.category.create({
				data: {
					name: createCategoryDto.name,
					description: createCategoryDto.description,
					image_url: createCategoryDto.file || null,
					parentCategoryId: createCategoryDto.parent || null,
					created_by_id: userID,
					depot_id: depot_id,
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
					parentCategoryId: null,
					depot: {
						users: {
							some: { id: user_id }
						}
					}
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
					},
					depot: {
						select: {
							id: true,
							name: true,
							description: true,
							image_url: true,
							created_by_id: true,
							created_at: true,
							updated_at: true,
						}
					}
				}
			});
			return categories;
		} catch (error) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.FIND.GENERAL}`);
		}
	}

	async findOne(id: string, user_id: string) {
		try {
			const category = await this.prisma.category.findFirst({
				where: {
					id: id,
					depot: {
						users: {
							some: { id: user_id }
						}
					}
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
					},
					childCategories: {
						select: {
							id: true,
							name: true,
							description: true,
							image_url: true,
							parentCategoryId: true,
							created_by_id: true,
						}
					},
					depot: {
						select: {
							id: true,
							name: true,
							description: true,
							image_url: true,
							created_by_id: true,
							created_at: true,
							updated_at: true,
						}
					}
				}
			})
			return category;
		} catch (error) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.FIND.GENERAL}`);
		};
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`;
	}

	async remove(id: string, user_id: string) {
		try {
			const res = await this.prisma.category.delete({
				where: {
					id: id,
					created_by_id: user_id
				},
				select: { id: true }
			})
			return res;
		} catch (error) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.DELETE.GENERAL}`);
		}
	}
}
