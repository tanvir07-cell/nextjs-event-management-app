/*
  Warnings:

  - You are about to drop the `ActivateUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActivateUser" DROP CONSTRAINT "ActivateUser_userId_fkey";

-- DropTable
DROP TABLE "ActivateUser";
