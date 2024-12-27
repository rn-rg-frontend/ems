/*
  Warnings:

  - You are about to drop the `ToatlLeaves` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalLeave` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LeaveTable" DROP CONSTRAINT "LeaveTable_availableLeaves_fkey";

-- DropForeignKey
ALTER TABLE "ToatlLeaves" DROP CONSTRAINT "ToatlLeaves_employeeId_fkey";

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "totalLeave" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ToatlLeaves";
