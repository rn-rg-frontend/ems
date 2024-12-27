-- CreateTable
CREATE TABLE "ToatlLeaves" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "totalLeaves" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ToatlLeaves_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ToatlLeaves" ADD CONSTRAINT "ToatlLeaves_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
