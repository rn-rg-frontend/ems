/*
  Warnings:

  - You are about to drop the column `salary` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the `WFH` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `annoucement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salary` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[salaryId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userProfileId` to the `LeaveTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LeaveTable" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userProfileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "salary",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "salaryId" INTEGER;

-- DropTable
DROP TABLE "WFH";

-- DropTable
DROP TABLE "annoucement";

-- DropTable
DROP TABLE "salary";

-- CreateTable
CREATE TABLE "WFHtable" (
    "id" SERIAL NOT NULL,
    "leaveType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalLeaves" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userProfileId" INTEGER NOT NULL,

    CONSTRAINT "WFHtable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Annoucement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "img" BYTEA NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Annoucement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salary" (
    "id" SERIAL NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalaryHistory" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "previousSalary" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalaryHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Salary_employeeId_key" ON "Salary"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_salaryId_key" ON "UserProfile"("salaryId");

-- AddForeignKey
ALTER TABLE "LeaveTable" ADD CONSTRAINT "LeaveTable_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WFHtable" ADD CONSTRAINT "WFHtable_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryHistory" ADD CONSTRAINT "SalaryHistory_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Salary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
