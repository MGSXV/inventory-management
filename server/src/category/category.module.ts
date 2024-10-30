import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
	imports: [FileUploadModule],
})
export class CategoryModule {}
