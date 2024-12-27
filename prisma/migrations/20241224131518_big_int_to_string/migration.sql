/*
  Warnings:

  - You are about to drop the column `totalLeaves` on the `WFHtable` table. All the data in the column will be lost.
  - Added the required column `totalWFH` to the `WFHtable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "contactDetails" SET DATA TYPE TEXT,
ALTER COLUMN "aadharCard" SET DATA TYPE TEXT,
ALTER COLUMN "emergencyContact" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WFHtable" DROP COLUMN "totalLeaves",
ADD COLUMN     "totalWFH" INTEGER NOT NULL;
