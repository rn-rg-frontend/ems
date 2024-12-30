/*
  Warnings:

  - You are about to drop the column `leaveType` on the `WFHtable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "totalWFH" INTEGER;

-- AlterTable
ALTER TABLE "WFHtable" DROP COLUMN "leaveType";
