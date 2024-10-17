import { join } from "path";

export const STORAGE_DIR = join(process.cwd(), 'storage');
export const IMG_DIR = join(STORAGE_DIR, 'images');
export const DEPOT_IMG_DIR = join(IMG_DIR, 'depot');
export const USER_IMG_DIR = join(IMG_DIR, 'user');

export const DEFAULT_DEPOT_IMG = join(DEPOT_IMG_DIR, 'default.png');
export const DEFAULT_USER_IMG = join(USER_IMG_DIR, 'default.png');