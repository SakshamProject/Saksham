/*
  Warnings:

  - You are about to drop the column `sevakendraId` on the `ServicesOnSevaKendras` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `SevaKendra` table. All the data in the column will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contactPersonId]` on the table `SevaKendra` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sevaKendraId` to the `ServicesOnSevaKendras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `SevaKendra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `districtId` to the `SevaKendra` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_districtId_fkey";

-- DropForeignKey
ALTER TABLE "ServicesOnSevaKendras" DROP CONSTRAINT "ServicesOnSevaKendras_sevakendraId_fkey";

-- DropForeignKey
ALTER TABLE "SevaKendra" DROP CONSTRAINT "SevaKendra_cityId_fkey";

-- AlterTable
ALTER TABLE "ServicesOnSevaKendras" DROP COLUMN "sevakendraId",
ADD COLUMN     "sevaKendraId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SevaKendra" DROP COLUMN "cityId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "createdAt" TEXT,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "districtId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN DEFAULT true,
ADD COLUMN     "updatedAt" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- DropTable
DROP TABLE "City";

-- CreateTable
CREATE TABLE "SevaKendraAuditLog" (
    "id" TEXT NOT NULL,
    "sevaKendraId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SevaKendraAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SevaKendra_contactPersonId_key" ON "SevaKendra"("contactPersonId");

-- AddForeignKey
ALTER TABLE "SevaKendra" ADD CONSTRAINT "SevaKendra_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SevaKendraAuditLog" ADD CONSTRAINT "SevaKendraAuditLog_sevaKendraId_fkey" FOREIGN KEY ("sevaKendraId") REFERENCES "SevaKendra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnSevaKendras" ADD CONSTRAINT "ServicesOnSevaKendras_sevaKendraId_fkey" FOREIGN KEY ("sevaKendraId") REFERENCES "SevaKendra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
