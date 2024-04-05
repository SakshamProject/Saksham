/*
  Warnings:

  - The `gender` column on the `DivyangDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `certificateIssueAuthority` column on the `DivyangDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `bloodGroup` on the `DivyangDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `isCompleted` on the `DivyangServiceMapping` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `address` to the `SevaKendra` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `SevaKendraAuditLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `date` on the `SevaKendraAuditLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('MALE', 'FEMALE', 'TRANSGENDER', 'OTHERS');

-- CreateEnum
CREATE TYPE "BloodGroupEnum" AS ENUM ('O_POSITIVE', 'O_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'A_POSITIVE', 'A_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'HH', 'others');

-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "CertificateIssueAuthorityEnum" AS ENUM ('MEDICAL_BOARD', 'GOVERNMENT_DOCTOR', 'PRIVATE_DOCTOR');

-- CreateEnum
CREATE TYPE "AuditLogStatusEnum" AS ENUM ('ACTIVE', 'DEACTIVE');

-- DropForeignKey
ALTER TABLE "DisabilitySubType" DROP CONSTRAINT "DisabilitySubType_disabilityTypeId_fkey";

-- DropForeignKey
ALTER TABLE "EducationQualification" DROP CONSTRAINT "EducationQualification_educationQualificationTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_serviceTypeId_fkey";

-- AlterTable
ALTER TABLE "DivyangDetails" DROP COLUMN "gender",
ADD COLUMN     "gender" "GenderEnum",
DROP COLUMN "bloodGroup",
ADD COLUMN     "bloodGroup" "BloodGroupEnum" NOT NULL,
DROP COLUMN "certificateIssueAuthority",
ADD COLUMN     "certificateIssueAuthority" "CertificateIssueAuthorityEnum";

-- AlterTable
ALTER TABLE "DivyangServiceMapping" DROP COLUMN "isCompleted",
ADD COLUMN     "isCompleted" "StatusEnum" NOT NULL;

-- AlterTable
ALTER TABLE "SevaKendra" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "createdAt" TEXT,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TEXT,
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "startDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SevaKendraAuditLog" DROP COLUMN "status",
ADD COLUMN     "status" "AuditLogStatusEnum" NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
ADD COLUMN     "gender" "GenderEnum";

-- DropEnum
DROP TYPE "BloodGroup";

-- DropEnum
DROP TYPE "CertificateIssueAuthority";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "generalMasters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "generalMasters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabilitySubType" ADD CONSTRAINT "DisabilitySubType_disabilityTypeId_fkey" FOREIGN KEY ("disabilityTypeId") REFERENCES "DisabilityType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationQualification" ADD CONSTRAINT "EducationQualification_educationQualificationTypeId_fkey" FOREIGN KEY ("educationQualificationTypeId") REFERENCES "EducationQualificationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
