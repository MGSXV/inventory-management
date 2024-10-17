import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AtGuard } from './common';
import { APP_GUARD } from '@nestjs/core';
import { DepotModule } from './depot/depot.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [PrismaModule, AuthModule, UserModule, DepotModule, CategoryModule],
	controllers: [],
	providers: [
		{ provide: APP_GUARD, useClass: AtGuard }
	],
})
export class AppModule {}
