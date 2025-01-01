/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `TypeOfExpense` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TypeOfExpense" DROP CONSTRAINT "TypeOfExpense_userProfileId_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "typeOfExpenseId" INTEGER;

-- AlterTable
ALTER TABLE "TypeOfExpense" DROP COLUMN "userProfileId";

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_typeOfExpenseId_fkey" FOREIGN KEY ("typeOfExpenseId") REFERENCES "TypeOfExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
