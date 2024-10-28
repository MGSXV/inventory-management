import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SUPPLIER } from 'src/common/errors';
import { EState } from '@prisma/client';

@Injectable()
export class SupplierService {

	constructor(private prisma: PrismaService) {}

	async create(createSupplierDto: CreateSupplierDto, user_id: string) {
		try {
			return await this.prisma.supplier.create({
				data: {
					name: createSupplierDto.name,
					description: createSupplierDto.description,
					image_url: createSupplierDto.file || null,
					state: EState.ACTIVE,
					created_by_id: user_id
				}
			})
		} catch (error) {
			throw new Error(`SUPPLIER.CREATE.${SUPPLIER.CREATE.GENERAL}`);
			
		}
	}

	async findAll(user_id: string) {
		try {
			const suppliers = await this.prisma.supplier.findMany({
				where: {
					created_by_id: user_id
				},
				select: {
					id: true,
					name: true,
					description: true,
					image_url: true,
					state: true,
					created_at: true,
					updated_at: true
				}
			})
			return suppliers
		} catch (error) {
			throw new Error(`SUPPLIER.CREATE.${SUPPLIER.CREATE.GENERAL}`);
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} supplier`;
	}

	update(id: number, updateSupplierDto: UpdateSupplierDto) {
		return `This action updates a #${id} supplier`;
	}

	async remove(id: string, user_id: string) { // TODO: delete all products associated with this supplier
		const is_valid = await this.prisma.supplier.findFirst({
			where: {
				id: id,
				created_by_id: user_id
			}
		});
		if (!is_valid) {
			throw new Error(`DEPOT.REMOVE.${SUPPLIER.REMOVE.NO_SUPPLIER_FOUND}`);
		}
		const results = await this.prisma.supplier.delete({
			where: {
				created_by_id: user_id,
				id: id
			}
		})
		return results;
	}
}
