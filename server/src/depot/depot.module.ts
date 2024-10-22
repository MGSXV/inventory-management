import { Module } from '@nestjs/common';
import { DepotService } from './depot.service';
import { DepotController } from './depot.controller';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  controllers: [DepotController],
  providers: [DepotService],
  imports: [FileUploadModule],
})
export class DepotModule {}
