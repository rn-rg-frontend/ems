/*
  Warnings:

  - Added the required column `availableLeaves` to the `LeaveTable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ToatlLeaves" DROP CONSTRAINT "ToatlLeaves_totalLeaves_fkey";

-- AlterTable
ALTER TABLE "LeaveTable" ADD COLUMN     "availableLeaves" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LeaveTable" ADD CONSTRAINT "LeaveTable_availableLeaves_fkey" FOREIGN KEY ("availableLeaves") REFERENCES "ToatlLeaves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
