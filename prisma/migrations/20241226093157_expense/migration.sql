/*
  Warnings:

  - Changed the type of `account` on the `Expense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "account",
ADD COLUMN     "account" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_account_fkey" FOREIGN KEY ("account") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
