-- AddForeignKey
ALTER TABLE "ToatlLeaves" ADD CONSTRAINT "ToatlLeaves_totalLeaves_fkey" FOREIGN KEY ("totalLeaves") REFERENCES "LeaveTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
