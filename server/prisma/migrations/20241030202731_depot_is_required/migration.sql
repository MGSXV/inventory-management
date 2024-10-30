/*
  Warnings:

  - Made the column `depot_id` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `depot_id` on table `suppliers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "depot_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "suppliers" ALTER COLUMN "depot_id" SET NOT NULL;
