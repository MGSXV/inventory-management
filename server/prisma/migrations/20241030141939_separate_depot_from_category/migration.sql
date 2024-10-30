/*
  Warnings:

  - You are about to drop the column `depot_id` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_depot_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "depot_id";
