-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parentCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "depots" DROP CONSTRAINT "depots_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "suppliers" DROP CONSTRAINT "suppliers_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_created_by_id_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "depot_id" TEXT;

-- AlterTable
ALTER TABLE "suppliers" ADD COLUMN     "depot_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "depots" ADD CONSTRAINT "depots_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_depot_id_fkey" FOREIGN KEY ("depot_id") REFERENCES "depots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_depot_id_fkey" FOREIGN KEY ("depot_id") REFERENCES "depots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
