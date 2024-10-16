import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { Token } from './types';
import { RtGuard } from 'src/common';
import { GetCurrentUser, GetCurrentUserID, Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Public()
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

	@Public()
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

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@GetCurrentUserID() user_id: string) {
		try {
			return await this.authService.logout(user_id);
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(RtGuard)
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refreshTokens(@GetCurrentUser() user: any): Promise<Token> {
		return await this.authService.refreshTokens(user['sub'], user['refresh_token']);
	}

}
