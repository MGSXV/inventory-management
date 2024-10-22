import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CloudinaryConfigModule } from 'src/cloudinary-config/cloudinary-config.module';

@Module({
  providers: [FileUploadService],
  exports: [FileUploadService],
  imports: [CloudinaryConfigModule],
})
export class FileUploadModule {}
