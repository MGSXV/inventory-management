import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EState } from 'src/common/enums';
import { AuthDto, LoginDto } from './dto';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compareData, hashData } from 'src/common/lib/';
import { AUTH, SIGNIN, SIGNUP } from 'src/common/errors';
import { LOGOUT } from 'src/common/errors/logout.error';

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
			throw new Error(`SIGNUP.USERNAME.${SIGNUP.USERNAME.ALREADY_EXISTS}`);
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

	async signinLocal(dto: LoginDto) {

		const user = await this.userService.findByUsername(dto.username);
		if (!user) {
			throw new Error(`SIGNIN.USERNAME.${SIGNIN.USERNAME.NOT_FOUND}`);
		}
		const is_valid = await compareData(dto.password, user.password);
		if (!is_valid) {
			throw new ForbiddenException(`SIGNIN.PASSWORD.${SIGNIN.PASSWORD.INVALID}`);
		}
		const tokens = await this.getTokens(user.id, user.username);
		this.userService.updateRefreshToken(user.id, tokens.refresh_token);
		return {
			...tokens,
			user: {
				id: user.id,
				username: user.username,
				first_name: user.first_name,
				last_name: user.last_name,
				avatar: user.avatar_url
			}
		}
	}

	async logout(user_id: string) {
		try {
			await this.userService.deleteRefreshToken(user_id);
		} catch (error) {
			throw new ForbiddenException(`LOGOUT.${LOGOUT.NO_TOKEN}`);
		}
		return true;
	}

	async refreshTokens(user_id: string, rt: string) {
		const user = await this.userService.findOneByID(user_id);
		if (!user)
			throw new ForbiddenException(`AUTH.${AUTH.ACCESS_DENIED}`);
		const is_valid = await compareData(rt, user.hashed_refresh_token || '');
		if (!is_valid)
			throw new ForbiddenException(`AUTH.${AUTH.ACCESS_DENIED}`);
		const tokens = await this.getTokens(user.id, user.username);
		this.userService.updateRefreshToken(user.id, tokens.refresh_token);
		return {
			...tokens,
			user: {
				id: user.id,
				username: user.username,
				first_name: user.first_name,
				last_name: user.last_name,
				avatar: user.avatar_url
			}
		}
	}

}
