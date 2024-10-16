import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';
import { hashData } from 'src/common';

@Injectable()
export class UserService {

	constructor(private prisma: PrismaService) {}

	async findOneByID(id: string) {
		return this.prisma.user.findUnique({
			where: { id }
		});
	}

	async update(user: UpdateUserDto) {
		return this.prisma.user.update({
			where: { id: user.id },
			data: {
				...user,
				password: await hashData(user.password),
			},
		});
	}

	async updateRefreshToken(user_id: string, refresh_token: string) {

		const hashed_refresh_token = await hashData(refresh_token);
		return this.prisma.user.update({
			where: { id: user_id },
			data: {
				hashed_refresh_token: hashed_refresh_token
			},
		});
	}

	async findByUsername(username: string) {
		return this.prisma.user.findUnique({
			where: { username }
		});
	}

	async deleteRefreshToken(user_id: string) {
		return this.prisma.user.update({
			where: {
				id: user_id,
				hashed_refresh_token: {
					not: null
				}
			},
			data: {
				hashed_refresh_token: null
			}
		})
	}

}
