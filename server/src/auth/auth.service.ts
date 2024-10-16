import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EState, hashData } from 'src/common';
import { AuthDto } from './dto';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private userService: UserService
	) {}

	private async getTokens(user_id: string, username: string): Promise<Token> {

		const [at, rt] = await Promise.all([
			this.jwtService.signAsync({
				sub: user_id,
				username
			}, {
				secret: process.env.ACCESS_TOKEN_SECRET,
				expiresIn: 60 * parseInt(process.env.AT_EXPIRES_IN || '15')
			}),
			this.jwtService.signAsync({
				sub: user_id,
				username
			}, {
				secret: process.env.REFRESH_TOKEN_SECRET,
				expiresIn: 60 * 7 * parseInt(process.env.RT_EXPIRES_IN || '1440')
			})
		])
		return {
			access_token: at,
			refresh_token: rt
		}
	}

	async signupLocal(dto: AuthDto): Promise<Token> {

		const already_exists = await this.userService.findByUsername(dto.username) !== null;

		if (already_exists) {
			throw new Error('SIGNUP.USERNAME_ALREADY_EXISTS');
		}

		const hash = await hashData(dto.password);
		const new_user = await this.prisma.user.create({
			data: {
				username: dto.username,
				password: hash,
				first_name: dto.first_name,
				last_name: dto.last_name,
				state: EState.ACTIVE,
			}
		})
		const tokens = await this.getTokens(new_user.id, new_user.username);
		this.userService.updateRefreshToken(new_user.id, tokens.refresh_token);
		return tokens;
	}

	async signinLocal() {
		return 'local signin';
	}

	async logout() {
		return 'logout';
	}

	async refreshTokens() {
		return 'refresh tokens';
	}

}
