import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Token } from './types';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post('/local/signup')
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

	@Post('/local/signin')
	async signinLocal() {
		return this.authService.signinLocal();
	}

	@Post('/logout')
	async logout() {
		return this.authService.logout();
	}

	@Post('/refresh')
	async refreshTokens() {
		return this.authService.refreshTokens();
	}

}
