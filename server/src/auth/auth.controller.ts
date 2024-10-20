import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { Token } from './types';
import { RtGuard } from 'src/common';
import { GetCurrentUser, GetCurrentUserID, Public } from 'src/common/decorators';
import { Request, response, Response } from 'express';

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
	async signinLocal(@Res() response: Response, @Body() dto: LoginDto) {
		try {
			const user = await this.authService.signinLocal(dto);
			response.cookie('access_token', user.access_token, {
				httpOnly: true,
				sameSite: 'strict'
				// secure: true, // For HTTPS only
			})
			response.cookie('refresh_token', user.refresh_token, {
				httpOnly: true,
				sameSite: 'strict'
				// secure: true, // For HTTPS only
			})
			return response.json({ message: {
				...user.user
			}, status: HttpStatus.OK })
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Res() response: Response,@GetCurrentUserID() user_id: string) {
		try {
			response.cookie('access_token', '', {
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 0
			})
			response.cookie('refresh_token', '', {
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 0
			})
			const res = this.authService.logout(user_id)
			response.end()
			return res
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: error.message,
			}, HttpStatus.BAD_REQUEST);
		}
	}

	@Public()
	@UseGuards(RtGuard)
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refreshTokens(@Req() request: Request, @Res() response: Response, @GetCurrentUser() user: any) {

		if (!request || !request.cookies) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: 'INVALID_REQUEST',
			}, HttpStatus.UNAUTHORIZED);
		}
		const refreshToken = request.cookies['refresh_token'];
		if (!refreshToken) {
			throw new HttpException({
			  status: HttpStatus.UNAUTHORIZED,
			  error: 'NO_REFRESH_TOKEN',
			}, HttpStatus.UNAUTHORIZED);
		}
		const new_res = await this.authService.refreshTokens(user['sub'], refreshToken);
		response.cookie('access_token', new_res.access_token, {
			httpOnly: true,
			sameSite: 'strict'
			// secure: true, // For HTTPS only
		})
		response.cookie('refresh_token', new_res.refresh_token, {
			httpOnly: true,
			sameSite: 'strict'
			// secure: true, // For HTTPS only
		})
		return response.json({ message: {
			...user.user
		}, status: HttpStatus.OK })
	}

}
