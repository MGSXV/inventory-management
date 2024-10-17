import { Injectable } from '@nestjs/common';
import { CreateDepotDto } from './dto/';
import { UpdateDepotDto } from './dto/';
import { PrismaService } from 'src/prisma/prisma.service';
import { EState } from 'src/common';
import { DEFAULT_DEPOT_IMG } from 'src/common/conf';
import { DEPOT } from 'src/common/errors';

@Injectable()
export class DepotService {

	constructor(private prisma: PrismaService) {}

	async create(createDepotDto: CreateDepotDto, user_id: string) {

		try {
			return await this.prisma.depot.create({
				data: {
					name: createDepotDto.name,
					description: createDepotDto.description,
					image_url: DEFAULT_DEPOT_IMG,
					state: EState.ACTIVE,
					created_by_id: user_id,
					users: {
						connect: {
							id: user_id
						}
					},
					UserDepot: {
						create: {
							user_id: user_id
						}
					},
				}
			})
		} catch (error) {
			throw new Error(`DEPOT.CREATE.${DEPOT.CREATE.GENERAL}`);
		}
	}

	async findAll(user_id: string) {
		try {
			const depots = await this.prisma.depot.findMany({
				where: {
					UserDepot: {
						some: {
							user_id: user_id
						}
					}
				},
				select: {
					id: true,
					name: true,
					description: true,
					image_url: true,
					state: true,
					created_at: true,
					updated_at: true,
				}
			})
			return depots
		} catch (error) {
			throw new Error(`DEPOT.FIND_ALL.${DEPOT.FIND_ALL.NO_DEPOT_FOUND}`);
		}
	}

	async findOne(id: string, user_id: string) {
		try {
			const depot = await this.prisma.depot.findUnique({
				where: {
					id: id,
					UserDepot: {
						some: {
							user_id: user_id
						}
					}
				},
				select: {
					id: true,
					name: true,
					description: true,
					image_url: true,
					state: true,
					created_at: true,
					updated_at: true,
					created_by: {
						select: {
							id: true,
							first_name: true,
							last_name: true,
							avatar_url: true,
						}
					},
					users: {
						where: {
							id: {
								not: user_id
							}
						},
						select: {
							id: true,
							first_name: true,
							last_name: true,
							avatar_url: true,
						}
					}
				}
			})
			return depot;
		} catch (error) {
			throw new Error(`DEPOT.FIND_ONE.${DEPOT.FIND_ONE.NO_DEPOT_FOUND}`);
			
		}
	}

	async update(id: string, user_id: string, updateDepotDto: UpdateDepotDto) {
		const is_valid = await this.prisma.depot.findFirst({
			where: {
				id: id,
				created_by_id: user_id
			}
		});
		if (!is_valid) {
			throw new Error(`DEPOT.UPDATE.${DEPOT.UPDATE.NO_DEPOT_FOUND}`);
		}
		try {
			const depo = await this.prisma.depot.update({
				where: {
					id: id,
					created_by_id: user_id
				},
				data: {
					name: updateDepotDto.name,
					description: updateDepotDto.description,
				},
				select: {
					id: true,
					name: true,
					description: true,
					image_url: true,
					created_by: {
						select: {
							id: true,
							first_name: true,
							last_name: true,
							avatar_url: true,
						}
					},
					users: {
						where: {
							id: {
								not: user_id
							}
						},
						select: {
							id: true,
							first_name: true,
							last_name: true,
							avatar_url: true,
						}
					}
				}
			});
			return depo;
		} catch (error) {
			throw new Error(`DEPOT.UPDATE.${DEPOT.UPDATE.GENERAL}`);
			
		}
	}

	async remove(id: string, user_id: string) {
		// TODO: remove all products that are in the depot
		// TODO: remove the avatar image from the depot
		const is_valid = await this.prisma.depot.findFirst({
			where: {
				id: id,
				created_by_id: user_id
			}
		});
		if (!is_valid) {
			throw new Error(`DEPOT.REMOVE.${DEPOT.REMOVE.NO_DEPOT_FOUND}`);
		}
		try {
			const depot = await this.prisma.depot.delete({
				where: {
					id: id,
					created_by_id: user_id
				},
				select: {
					name: true,
				}
			})
			return depot
		} catch (error) {
			throw new Error(`DEPOT.REMOVE.${DEPOT.REMOVE.GENERAL}`);
		}
	}

	async addUser(depot_id: string, user_id: string, current_user_id: string) {
		const is_valid = await this.prisma.depot.findFirst({
			where: {
				id: depot_id,
				created_by_id: current_user_id
			}
		});
		if (!is_valid) {
			throw new Error(`DEPOT.UPDATE.${DEPOT.UPDATE.NO_DEPOT_FOUND}`);
		}
		const already_added = await this.prisma.userDepot.findFirst({
			where: {
				user_id: user_id,
				depot_id: depot_id
			}
		})
		if (already_added) {
			throw new Error(`DEPOT.UPDATE.${DEPOT.UPDATE.USER_ALREADY_EXISTS}`);
		}
		try {
			const depot = await this.prisma.depot.update({
				where: {
					id: depot_id,
					created_by_id: current_user_id
				},
				data: {
					users: {
						connect: {
							id: user_id
						}
					},
					UserDepot: {
						create: {
							user_id: user_id
						}
					}
				},
				select: {
					id: true,
					name: true,
					description: true,
					image_url: true,
					created_by: {
						select: {
							id: true,
							first_name: true,
							last_name: true,
							avatar_url: true,
						}
					},
					users: {
						where: {
							id: {
								not: user_id
							}
						},
						select: {
							id: true,
							first_name: true,
							last_name: true,
							avatar_url: true,
						}
					}
				}
			})
			return depot;
		} catch (error) {
			throw new Error(`DEPOT.UPDATE.${DEPOT.UPDATE.GENERAL}`);
		}
	}

	async removeUser(depot_id: string, user_id: string, current_user_id: string) {
		const is_valid = await this.prisma.depot.findFirst({
			where: {
				id: depot_id,
				created_by_id: current_user_id
			}
		});
		if (!is_valid) {
			throw new Error(`DEPOT.UPDATE.${DEPOT.UPDATE.NO_DEPOT_FOUND}`);
		}
		const already_added = await this.prisma.userDepot.findFirst({
			where: {
				user_id: user_id,
				depot_id: depot_id
			}
		})
		if (!already_added) {
			throw new Error(`DEPOT.UPDATE.${DEPOT.UPDATE.NO_DEPOT_FOUND}`);
		}
		try {
			const depot = await this.prisma.depot.update({
				where: {
					id: depot_id,
					created_by_id: current_user_id
				},
				data: {
					users: {
						disconnect: {
							id: user_id
						}
					},
					UserDepot: {
						deleteMany: {
							user_id: user_id,
							depot_id: depot_id
						}
					}
				},
				select: {
					id: true,
					name: true,
					description: true,
					image_url: true,
					created_by: {
						select: {
							id: true,
							first_name: true,
							last_name: true,
							avatar_url: true,
						}
					},
					users: {
						where: {
							id: {
								not: user_id
							}
						},
						select: {
							id: true,
							first_name: true,
							last_name: true,
							avatar_url: true,
						}
					}
				}
			})
			return depot;
		} catch (error) {
			throw new Error(`DEPOT.UPDATE.${DEPOT.UPDATE.GENERAL}`);
		}
	}
}
