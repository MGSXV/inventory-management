import { join } from "path";

export const DEPOT_STORAGE = 'depot';
export const USER_STORAGE = 'user';
export const SUPPLIERS_STORAGE = 'suppliers';
export const CATEGORY_STORAGE = 'category';
export const IMGS_STORAGE = 'images';
export const IMG_DIR = join(IMGS_STORAGE);
export const DEPOT_IMG_DIR = join(IMG_DIR, DEPOT_STORAGE);
export const USER_IMG_DIR = join(IMG_DIR, USER_STORAGE);
export const SUPPLIER_IMG_DIR = join(IMG_DIR, SUPPLIERS_STORAGE);
export const CATEGORY_IMG_DIR = join(IMG_DIR, CATEGORY_STORAGE);

export const DEFAULT_DEPOT_IMG = join(DEPOT_IMG_DIR, 'default.png');
export const DEFAULT_USER_IMG = join(USER_IMG_DIR, 'default.png');