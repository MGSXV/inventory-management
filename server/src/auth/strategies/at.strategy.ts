import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {

	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					let token = null
					if (req && req.cookies) {
						token = req.cookies['access_token']; 
					}
					return token
				}
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'at_secret'
		})
	}

	validate(payload: any) {
		return payload
	}

}