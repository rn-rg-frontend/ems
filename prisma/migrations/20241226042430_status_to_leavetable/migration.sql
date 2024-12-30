/*
  Warnings:

  - Added the required column `status` to the `LeaveTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `WFHtable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaveTable" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "WFHtable" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "CV" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "file" BYTEA NOT NULL,

    CONSTRAINT "CV_pkey" PRIMARY KEY ("id")
);
