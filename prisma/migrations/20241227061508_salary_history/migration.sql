-- AlterTable
ALTER TABLE "CV" ADD COLUMN     "userProfileId" INTEGER;

-- AddForeignKey
ALTER TABLE "CV" ADD CONSTRAINT "CV_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
