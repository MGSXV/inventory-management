import { Module } from '@nestjs/common';
import { CloudinaryConfigService } from './cloudinary-config.service';

@Module({
  providers: [CloudinaryConfigService],
  exports: [CloudinaryConfigService],
})
export class CloudinaryConfigModule {}
