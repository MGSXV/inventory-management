import * as bcrypt from 'bcrypt';

export async function hashData(data: string) {
	return await bcrypt.hash(data, 10);
}

export async function compareData(data: string, hash: string) {
	return await bcrypt.compare(data, hash);
}