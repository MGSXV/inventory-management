import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CATEGORY } from 'src/common/errors';
import { EState } from '@prisma/client';

@Injectable()
export class CategoryService {

	constructor(private prisma: PrismaService) {}

	async create(depot_id: string, user_id: string, createCategoryDto: CreateCategoryDto) {
		const depot = await this.depotOwnership(depot_id, user_id);
		if (!depot) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.PERMISION_DENIED}`);
		}
		if (createCategoryDto.parent_id) {
			const cat = await this.getParentCategory(createCategoryDto.parent_id);
			if (cat) {
				throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.INVALID_OPERATION}`);
			}
		}
		try {
			const category = await this.prisma.category.create({
				data: {
					name: createCategoryDto.name,
					description: createCategoryDto.description,
					state: EState.ACTIVE,
					created_by_id: user_id,
					depot_id: depot_id,
					parentCategoryId: createCategoryDto.parent_id ? createCategoryDto.parent_id : undefined,
				},
				select: {
					id: true,
					name: true,
					description: true,
					state: true,
					created_by_id: true,
					depot_id: true,
					childCategories: {
						select: {
							id: true,
							name: true,
							description: true,
							state: true,
							created_by_id: true,
							depot_id: true,
						}
					}
				}
			})
			return category;
		} catch (error) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.GENERAL}`);
		}
	}

	async findAll(user_id: string, depot_id: string) {
		const depot = await this.isUserInDepot(depot_id, user_id);
		if (!depot) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.PERMISION_DENIED}`);
		}
		try {
			return await this.prisma.category.findMany({
				where: {
					depot_id: depot_id
				},
				select: {
					id: true,
					name: true,
					description: true,
					state: true,
					created_by_id: true,
					depot_id: true,
					image_url: true,
					childCategories: {
						select: {
							id: true,
							name: true,
							description: true,
							state: true,
							created_by_id: true,
							depot_id: true,
							image_url: true,
						}
					}
				}
			})
		} catch (error) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.GENERAL}`);
		}
	}

	async findOne(id: string, depot_id: string, user_id: string) {
		const is_in_depot = await this.isUserInDepot(depot_id, user_id);
		if (!is_in_depot) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.PERMISION_DENIED}`);
		}
		try {
			return await this.prisma.category.findFirst({
				where: {
					id: id,
					depot_id: depot_id
				},
				select: {
					id: true,
					name: true,
					description: true,
					state: true,
					created_by_id: true,
					depot_id: true,
					image_url: true,
					childCategories: {
						select: {
							id: true,
							name: true,
							description: true,
							state: true,
							created_by_id: true,
							depot_id: true,
							image_url: true,
						}
					}
				}
			})
		} catch (error) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.GENERAL}`);
		}
	}

	async findChildren(parent_id: string, depot_id: string, user_id: string) {
		const is_in_depot = await this.isUserInDepot(depot_id, user_id);
		if (!is_in_depot) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.PERMISION_DENIED}`);
		}
		try {
			return await this.prisma.category.findMany({
				where: {
					parentCategoryId: parent_id,
					depot_id: depot_id
				},
				select: {
					id: true,
					name: true,
					description: true,
					state: true,
					created_by_id: true,
					depot_id: true,
					image_url: true,
					childCategories: {
						select: {
							id: true,
							name: true,
							description: true,
							state: true,
							created_by_id: true,
							depot_id: true,
							image_url: true,
						}
					}
				}
			})
		} catch (error) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.GENERAL}`);
		}
	}

	async update(id: string, depot_id: string, user_id: string, updateCategoryDto: UpdateCategoryDto) {
		const cat = await this.depotOwnership(depot_id, user_id);
		if (!cat) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.PERMISION_DENIED}`);
		}
		try {
			const category = await this.prisma.category.update({
				where: {
					id: id,
					depot_id: depot_id,
					created_by_id: user_id
				},
				data: {
					name: updateCategoryDto.name,
					description: updateCategoryDto.description,
				}
			})
			return category;
		} catch (error) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.GENERAL}`);
		}
	}

	async remove(id: string, depot_id: string, user_id: string) {
		const cat = await this.depotOwnership(depot_id, user_id);
		if (!cat) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.PERMISION_DENIED}`);
		}
		try {
			return await this.prisma.category.delete({
				where: {
					id: id,
					depot_id: depot_id,
					created_by_id: user_id
				}
			})
		} catch (error) {
			throw new Error(`CATEGORY.CREATE.${CATEGORY.CREATE.GENERAL}`);
		}
	}

	private async getParentCategory(id: string) {
		return await this.prisma.category.findFirst({
			where: {
				id: id
			},
			select: {
				parentCategory: {
					select: {
						id: true,
						name: true,
						description: true,
						state: true,
						created_by_id: true,
						depot_id: true,
					}
				}
			}
		})
	}

	private async depotOwnership(depot_id: string, user_id: string) {
		return await this.prisma.depot.findFirst({
			where: {
				id: depot_id,
				created_by_id: user_id
			}
		})
	}

	private async isUserInDepot(depot_id: string, user_id: string) {
		return await this.prisma.depot.findFirst({
			where: {
				id: depot_id,
				users: {
					some: {
						id: user_id
					}
				}
			}
		})
	}
}
