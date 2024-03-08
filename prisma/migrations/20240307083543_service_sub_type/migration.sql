/*
  Warnings:

  - You are about to drop the column `serviceSubType` on the `DivyangServiceMapping` table. All the data in the column will be lost.
  - You are about to drop the column `serviceTypeId` on the `Service` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `DivyangServiceMapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTypeId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_serviceTypeId_fkey";

-- AlterTable
ALTER TABLE "DivyangServiceMapping" DROP COLUMN "serviceSubType",
ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "serviceTypeId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subTypeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ServiceSubType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serviceTypeId" TEXT NOT NULL,

    CONSTRAINT "ServiceSubType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceSubType" ADD CONSTRAINT "ServiceSubType_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_subTypeId_fkey" FOREIGN KEY ("subTypeId") REFERENCES "ServiceSubType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangServiceMapping" ADD CONSTRAINT "DivyangServiceMapping_divyangId_fkey" FOREIGN KEY ("divyangId") REFERENCES "DivyangPersonalDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangServiceMapping" ADD CONSTRAINT "DivyangServiceMapping_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
