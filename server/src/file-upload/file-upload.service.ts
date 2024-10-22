import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { DEPOT } from 'src/common/errors';
const sanitizeFilename = require('sanitize-filename');
import { v4 as uuidv4 } from 'uuid';
// import path, { resolve } from 'path';
import { CloudinaryConfigService } from 'src/cloudinary-config/cloudinary-config.service';

// max 10mb
const MAX_FILE_SIZE = 1024 * 1024 * 10;

@Injectable()
export class FileUploadService {

	constructor(private readonly cloudinaryConfig: CloudinaryConfigService) {}

	async uploadFile(file: Express.Multer.File, upload_path: string) {

		const cloudinary = this.cloudinaryConfig.getCloudinaryInstance();

		if (!file)
			throw new BadRequestException(`DEPOT.CREATE.IMAGE_URL.${DEPOT.CREATE.IMAGE_URL.NO_FILE_UPLOADED}`)
		if (file.size > MAX_FILE_SIZE )
			throw new BadRequestException(`DEPOT.CREATE.IMAGE_URL.${DEPOT.CREATE.IMAGE_URL.FILE_IS_TOO_LARGE}`)
		const sanitized_file_name = sanitizeFilename(file.originalname)
		const unique_file_name = `${uuidv4()}-${sanitized_file_name}`;
		const result: string = await new Promise((resolve, reject) => {
			const upload_stream = cloudinary.uploader.upload_stream({
				public_id: unique_file_name,
				folder: upload_path,
				resource_type: 'image',
				overwrite: true,
			}, (error, result) => {
				if (error) {
					reject(new BadRequestException(`DEPOT.CREATE.IMAGE_URL.${DEPOT.CREATE.IMAGE_URL.UPLOAD_ERROR}`))
				}
				if (!result)
					throw new BadRequestException(`DEPOT.CREATE.IMAGE_URL.${DEPOT.CREATE.IMAGE_URL.UPLOAD_ERROR}`)
				resolve(result.secure_url);
			});
			upload_stream.end(file.buffer);
		})
		console.log(result)
		return result;
	}

	deleteFile(filePath: string): void {
		if (fs.existsSync(filePath)) {
		  fs.unlinkSync(filePath);
		}
	  }

}
