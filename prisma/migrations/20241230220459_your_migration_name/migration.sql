/*
  Warnings:

  - You are about to drop the column `pharmacy_id` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the `Pharmacy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_pharmacy_id_fkey";

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "pharmacy_id";

-- DropTable
DROP TABLE "Pharmacy";
