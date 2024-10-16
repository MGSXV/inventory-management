import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Token } from './types';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post('/local/signup')
	async signupLocal(@Body() dto: AuthDto): Promise<Token> {
		return this.authService.signupLocal(dto);
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