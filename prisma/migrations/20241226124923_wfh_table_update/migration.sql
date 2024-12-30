/*
  Warnings:

  - You are about to drop the column `totalWFH` on the `WFHtable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "totalWFH" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "WFHtable" DROP COLUMN "totalWFH";
