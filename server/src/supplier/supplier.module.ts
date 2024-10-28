import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
	controllers: [SupplierController],
	providers: [SupplierService],
	imports: [FileUploadModule],
})
export class SupplierModule {}
