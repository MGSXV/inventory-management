import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { Token } from './types';
import { Request } from 'express';
import { AtGuard, RtGuard } from 'src/common';
import { GetCurrentUser, GetCurrentUserID } from 'src/common/decorators';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post('local/signup')
	@HttpCode(HttpStatus.CREATED)
	async signupLocal(@Body() dto: AuthDto): Promise<Token> {
		try {
			return await this.authService.signupLocal(dto);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Post('local/signin')
	@HttpCode(HttpStatus.OK)
	async signinLocal(@Body() dto: LoginDto): Promise<Token> {
		try {
			return await this.authService.signinLocal(dto);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(AtGuard)
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@GetCurrentUserID() user_id: string) {
		return this.authService.logout(user_id);
	}

	@UseGuards(RtGuard)
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refreshTokens(@GetCurrentUser() user: any): Promise<Token> {
		return this.authService.refreshTokens(user['sub'], user['refresh_token']);
	}

}
