import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';
import { Injectable } from "@nestjs/common";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					let token = null
					if (req && req.cookies) {
						token = req.cookies['refresh_token']; 
					}
					return token
				}
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.REFRESH_TOKEN_SECRET || 'rt_secret',
			passReqToCallback: true
		})
	}

	validate(req: Request, payload: any) {
		const refresh_token = req.cookies['refresh_token'];
		return {
			...payload,
			refresh_token
		}
	}

}