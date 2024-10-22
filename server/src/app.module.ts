import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AtGuard } from './common';
import { APP_GUARD } from '@nestjs/core';
import { DepotModule } from './depot/depot.module';
import { CategoryModule } from './category/category.module';
import { FileUploadService } from './file-upload/file-upload.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { CloudinaryConfigModule } from './cloudinary-config/cloudinary-config.module';

@Module({
	imports: [PrismaModule, AuthModule, UserModule, DepotModule, CategoryModule, FileUploadModule, CloudinaryConfigModule],
	controllers: [],
	providers: [
		{ provide: APP_GUARD, useClass: AtGuard },
	],
})
export class AppModule {}
