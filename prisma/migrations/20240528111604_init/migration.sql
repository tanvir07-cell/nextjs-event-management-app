-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ActivateUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ActivateUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivateUser" ADD CONSTRAINT "ActivateUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
