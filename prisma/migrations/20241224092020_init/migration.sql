-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photo" BYTEA NOT NULL,
    "designation" TEXT NOT NULL,
    "dateOfJoining" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "contactDetails" BIGINT NOT NULL,
    "DOB" TIMESTAMP(3) NOT NULL,
    "highestEducation" TEXT NOT NULL,
    "instituteName" TEXT NOT NULL,
    "aadharCard" BIGINT NOT NULL,
    "panCard" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "emergencyContact" BIGINT NOT NULL,
    "medicalHistory" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveTable" (
    "id" SERIAL NOT NULL,
    "leaveType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalLeaves" INTEGER NOT NULL,

    CONSTRAINT "LeaveTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WFH" (
    "id" SERIAL NOT NULL,
    "leaveType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalLeaves" INTEGER NOT NULL,

    CONSTRAINT "WFH_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annoucement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "img" BYTEA NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annoucement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salary" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
