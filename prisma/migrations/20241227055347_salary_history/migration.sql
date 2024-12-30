/*
  Warnings:

  - Added the required column `salaryId` to the `SalaryHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SalaryHistory" DROP CONSTRAINT "SalaryHistory_employeeId_fkey";

-- AlterTable
ALTER TABLE "SalaryHistory" ADD COLUMN     "salaryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SalaryHistory" ADD CONSTRAINT "SalaryHistory_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryHistory" ADD CONSTRAINT "SalaryHistory_salaryId_fkey" FOREIGN KEY ("salaryId") REFERENCES "Salary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
