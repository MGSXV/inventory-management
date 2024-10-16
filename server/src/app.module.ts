import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AtGuard } from './common';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [PrismaModule, AuthModule, UserModule],
	controllers: [],
	providers: [
		{ provide: APP_GUARD, useClass: AtGuard }
	],
})
export class AppModule {}
