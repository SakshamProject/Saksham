/*
  Warnings:

  - You are about to drop the `CommunityCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Corporation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DisabilityOfDivyang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DisabilitySubType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DisabilityType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DivyangEducationalQualification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DivyangPersonalDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DivyangServiceMapping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EducationQualification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeaturesOnRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FollowUp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MLAConstituency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MPConstituency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Municipality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PanchayatUnion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TownPanchayat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DisabilityOfDivyang" DROP CONSTRAINT "DisabilityOfDivyang_disabilitySubTypeId_fkey";

-- DropForeignKey
ALTER TABLE "DisabilityOfDivyang" DROP CONSTRAINT "DisabilityOfDivyang_divyangId_fkey";

-- DropForeignKey
ALTER TABLE "DisabilitySubType" DROP CONSTRAINT "DisabilitySubType_disabilityTypeId_fkey";

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_stateId_fkey";

-- DropForeignKey
ALTER TABLE "DivyangEducationalQualification" DROP CONSTRAINT "DivyangEducationalQualification_divyangPersonalDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "DivyangEducationalQualification" DROP CONSTRAINT "DivyangEducationalQualification_educationalQualificationId_fkey";

-- DropForeignKey
ALTER TABLE "DivyangPersonalDetails" DROP CONSTRAINT "DivyangPersonalDetails_communityCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "DivyangPersonalDetails" DROP CONSTRAINT "DivyangPersonalDetails_districtId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturesOnRoles" DROP CONSTRAINT "FeaturesOnRoles_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "FeaturesOnRoles" DROP CONSTRAINT "FeaturesOnRoles_featureId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturesOnRoles" DROP CONSTRAINT "FeaturesOnRoles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "FollowUp" DROP CONSTRAINT "FollowUp_divyangServiceMappingId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_sevaKendraId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_serviceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "ServicesOnSevaKendras" DROP CONSTRAINT "ServicesOnSevaKendras_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "SevaKendra" DROP CONSTRAINT "SevaKendra_districtId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_passwordId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sevaKendraId_fkey";

-- DropTable
DROP TABLE "CommunityCategory";

-- DropTable
DROP TABLE "Corporation";

-- DropTable
DROP TABLE "DisabilityOfDivyang";

-- DropTable
DROP TABLE "DisabilitySubType";

-- DropTable
DROP TABLE "DisabilityType";

-- DropTable
DROP TABLE "District";

-- DropTable
DROP TABLE "DivyangEducationalQualification";

-- DropTable
DROP TABLE "DivyangPersonalDetails";

-- DropTable
DROP TABLE "DivyangServiceMapping";

-- DropTable
DROP TABLE "EducationQualification";

-- DropTable
DROP TABLE "Feature";

-- DropTable
DROP TABLE "FeaturesOnRoles";

-- DropTable
DROP TABLE "FollowUp";

-- DropTable
DROP TABLE "MLAConstituency";

-- DropTable
DROP TABLE "MPConstituency";

-- DropTable
DROP TABLE "Municipality";

-- DropTable
DROP TABLE "PanchayatUnion";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "ServiceType";

-- DropTable
DROP TABLE "State";

-- DropTable
DROP TABLE "TownPanchayat";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserPassword";

-- DropEnum
DROP TYPE "BloodGroup";

-- DropEnum
DROP TYPE "Gender";
