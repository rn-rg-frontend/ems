/*
  Warnings:

  - You are about to drop the column `userId` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userName]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isAdmin` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userId_fkey";

-- DropIndex
DROP INDEX "UserProfile_userId_key";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "userId",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userName_key" ON "UserProfile"("userName");
