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

-- CreateTable
CREATE TABLE "SevaKendra" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "landLineNumber" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "contactPersonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "currentStatus" "AuditLogStatusEnum",

    CONSTRAINT "SevaKendra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SevaKendraAuditLog" (
    "id" TEXT NOT NULL,
    "sevaKendraId" TEXT NOT NULL,
    "status" "AuditLogStatusEnum" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "SevaKendraAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactPerson" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber1" TEXT NOT NULL,
    "phoneNumber2" TEXT,

    CONSTRAINT "ContactPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicesOnSevaKendras" (
    "id" TEXT NOT NULL,
    "sevakendraId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ServicesOnSevaKendras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "GenderEnum",
    "dateOfBirth" TIMESTAMP(3),
    "contactNumber" TEXT NOT NULL,
    "whatsappNumber" TEXT,
    "designationId" TEXT NOT NULL,
    "picture" TEXT,
    "mail" TEXT NOT NULL,
    "loginid" TEXT NOT NULL,
    "passwordId" TEXT NOT NULL,
    "currentStatus" "AuditLogStatusEnum",
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "AuditLogStatusEnum" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "UserAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPassword" (
    "id" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "UserPassword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Designation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sevaKendraId" TEXT NOT NULL,
    "currentStatus" "AuditLogStatusEnum",
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "updatedAt" TIMESTAMP(3),
    "updatedById" TEXT,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignationAuditLog" (
    "id" TEXT NOT NULL,
    "designationId" TEXT NOT NULL,
    "status" "AuditLogStatusEnum" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "DesignationAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesOnDesignations" (
    "id" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "designationId" TEXT NOT NULL,

    CONSTRAINT "FeaturesOnDesignations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DivyangDetails" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "divyangId" TEXT NOT NULL,
    "picture" TEXT,
    "gender" "GenderEnum",
    "bloodGroup" "BloodGroupEnum" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "age" INTEGER,
    "mailId" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "isMarried" BOOLEAN,
    "spouseName" TEXT,
    "spouseNumber" TEXT,
    "religion" TEXT NOT NULL,
    "communityCategoryId" TEXT NOT NULL,
    "extraCurricularActivity" TEXT,
    "voterId" TEXT,
    "panCardNumber" TEXT,
    "drivingLicense" TEXT,
    "rationCardNumber" TEXT,
    "aadharCardNumber" TEXT,
    "pensionCardNumber" TEXT,
    "medicalInsuranceNumber" TEXT,
    "disabilitySchemeNumber" TEXT,
    "BPL_OR_APL_Number" TEXT,
    "doorNumber" TEXT,
    "flatNumber" TEXT,
    "streetName" TEXT,
    "nagarName" TEXT,
    "districtId" TEXT,
    "isRural" BOOLEAN,
    "villageName" TEXT,
    "panchayatUnionId" TEXT,
    "talukId" TEXT,
    "townPanchayatId" TEXT,
    "municipalityId" TEXT,
    "corporationId" TEXT,
    "MLAConstituencyId" TEXT,
    "MPConstituancyId" TEXT,
    "pincode" INTEGER,
    "isDisabilitySinceBirth" BOOLEAN,
    "disabilitySince" TIMESTAMP(3),
    "disabilityArea" TEXT,
    "disabilityPercentage" INTEGER,
    "disabilityDueTo" TEXT,
    "certificateIssueAuthority" "CertificateIssueAuthorityEnum",
    "disabilityCardUrl" TEXT,
    "disabilityDistrictId" TEXT,
    "identityCardNumber" TEXT,
    "udidCardNumber" TEXT,
    "udidEnrollmentNumber" TEXT,
    "udidCardUrl" TEXT,
    "isEmployed" BOOLEAN,
    "unemployedSince" TIMESTAMP(3),
    "occupation" TEXT,
    "income" INTEGER,
    "fatherOccupation" TEXT,
    "fatherIncome" INTEGER,
    "motherOccupation" TEXT,
    "motherIncome" INTEGER,
    "spouseOccupation" TEXT,
    "spouseIncome" INTEGER,

    CONSTRAINT "DivyangDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DivyangServiceMapping" (
    "id" TEXT NOT NULL,
    "divyangId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "dateOfService" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isFollowUpRequired" BOOLEAN,
    "isCompleted" "StatusEnum" NOT NULL,
    "completedDate" TIMESTAMP(3),
    "donorId" TEXT,

    CONSTRAINT "DivyangServiceMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DivyangServiceMappingAuditLog" (
    "id" TEXT NOT NULL,
    "DivyangServiceMappingId" TEXT NOT NULL,
    "status" "AuditLogStatusEnum" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "DivyangServiceMappingAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SevaKendraFollowUp" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "districtId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "divyangServiceMappingId" TEXT NOT NULL,

    CONSTRAINT "SevaKendraFollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NonSevaKendraFollowUp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sendMail" BOOLEAN NOT NULL,
    "divyangServiceMappingId" TEXT NOT NULL,

    CONSTRAINT "NonSevaKendraFollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisabilityOfDivyang" (
    "id" TEXT NOT NULL,
    "divyangId" TEXT NOT NULL,
    "disabilitySubTypeId" TEXT NOT NULL,
    "divyangDisabilityDetailsId" TEXT NOT NULL,

    CONSTRAINT "DisabilityOfDivyang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisabilitySubType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "disabilityTypeId" TEXT NOT NULL,

    CONSTRAINT "DisabilitySubType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisabilityType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DisabilityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MPConstituency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "MPConstituency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MLAConstituency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "MLAConstituency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanchayatUnion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "PanchayatUnion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TownPanchayat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "TownPanchayat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corporation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "Corporation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taluk" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "Taluk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CommunityCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DivyangEducationalQualification" (
    "id" TEXT NOT NULL,
    "DivyangDetailsId" TEXT NOT NULL,
    "educationalQualificationId" TEXT NOT NULL,

    CONSTRAINT "DivyangEducationalQualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationQualification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "educationQualificationTypeId" TEXT NOT NULL,

    CONSTRAINT "EducationQualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationQualificationType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EducationQualificationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generalMasters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "generalMasters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SevaKendra_name_key" ON "SevaKendra"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ServicesOnSevaKendras_sevakendraId_serviceId_key" ON "ServicesOnSevaKendras"("sevakendraId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceType_name_key" ON "ServiceType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Service_serviceTypeId_name_key" ON "Service"("serviceTypeId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "District_name_key" ON "District"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_loginid_key" ON "User"("loginid");

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordId_key" ON "User"("passwordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_updatedById_key" ON "User"("updatedById");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_key" ON "Feature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Designation_sevaKendraId_name_key" ON "Designation"("sevaKendraId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "DivyangServiceMapping_donorId_key" ON "DivyangServiceMapping"("donorId");

-- CreateIndex
CREATE UNIQUE INDEX "DisabilitySubType_disabilityTypeId_name_key" ON "DisabilitySubType"("disabilityTypeId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "DisabilityType_name_key" ON "DisabilityType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MPConstituency_name_districtId_key" ON "MPConstituency"("name", "districtId");

-- CreateIndex
CREATE UNIQUE INDEX "MLAConstituency_name_districtId_key" ON "MLAConstituency"("name", "districtId");

-- CreateIndex
CREATE UNIQUE INDEX "PanchayatUnion_name_districtId_key" ON "PanchayatUnion"("name", "districtId");

-- CreateIndex
CREATE UNIQUE INDEX "TownPanchayat_name_districtId_key" ON "TownPanchayat"("name", "districtId");

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_name_districtId_key" ON "Municipality"("name", "districtId");

-- CreateIndex
CREATE UNIQUE INDEX "Corporation_name_districtId_key" ON "Corporation"("name", "districtId");

-- CreateIndex
CREATE UNIQUE INDEX "Taluk_name_districtId_key" ON "Taluk"("name", "districtId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityCategory_name_key" ON "CommunityCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EducationQualification_educationQualificationTypeId_name_key" ON "EducationQualification"("educationQualificationTypeId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "EducationQualificationType_name_key" ON "EducationQualificationType"("name");

-- AddForeignKey
ALTER TABLE "SevaKendra" ADD CONSTRAINT "SevaKendra_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SevaKendra" ADD CONSTRAINT "SevaKendra_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "ContactPerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SevaKendraAuditLog" ADD CONSTRAINT "SevaKendraAuditLog_sevaKendraId_fkey" FOREIGN KEY ("sevaKendraId") REFERENCES "SevaKendra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnSevaKendras" ADD CONSTRAINT "ServicesOnSevaKendras_sevakendraId_fkey" FOREIGN KEY ("sevakendraId") REFERENCES "SevaKendra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnSevaKendras" ADD CONSTRAINT "ServicesOnSevaKendras_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_passwordId_fkey" FOREIGN KEY ("passwordId") REFERENCES "UserPassword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAuditLog" ADD CONSTRAINT "UserAuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_sevaKendraId_fkey" FOREIGN KEY ("sevaKendraId") REFERENCES "SevaKendra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignationAuditLog" ADD CONSTRAINT "DesignationAuditLog_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesOnDesignations" ADD CONSTRAINT "FeaturesOnDesignations_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesOnDesignations" ADD CONSTRAINT "FeaturesOnDesignations_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangDetails" ADD CONSTRAINT "DivyangDetails_communityCategoryId_fkey" FOREIGN KEY ("communityCategoryId") REFERENCES "CommunityCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangDetails" ADD CONSTRAINT "DivyangDetails_corporationId_fkey" FOREIGN KEY ("corporationId") REFERENCES "Corporation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangDetails" ADD CONSTRAINT "DivyangDetails_MLAConstituencyId_fkey" FOREIGN KEY ("MLAConstituencyId") REFERENCES "MLAConstituency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangDetails" ADD CONSTRAINT "DivyangDetails_MPConstituancyId_fkey" FOREIGN KEY ("MPConstituancyId") REFERENCES "MPConstituency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangDetails" ADD CONSTRAINT "DivyangDetails_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangDetails" ADD CONSTRAINT "DivyangDetails_townPanchayatId_fkey" FOREIGN KEY ("townPanchayatId") REFERENCES "TownPanchayat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangDetails" ADD CONSTRAINT "DivyangDetails_talukId_fkey" FOREIGN KEY ("talukId") REFERENCES "Taluk"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangDetails" ADD CONSTRAINT "DivyangDetails_panchayatUnionId_fkey" FOREIGN KEY ("panchayatUnionId") REFERENCES "PanchayatUnion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangDetails" ADD CONSTRAINT "DivyangDetails_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangServiceMapping" ADD CONSTRAINT "DivyangServiceMapping_divyangId_fkey" FOREIGN KEY ("divyangId") REFERENCES "DivyangDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangServiceMapping" ADD CONSTRAINT "DivyangServiceMapping_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangServiceMapping" ADD CONSTRAINT "DivyangServiceMapping_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangServiceMappingAuditLog" ADD CONSTRAINT "DivyangServiceMappingAuditLog_DivyangServiceMappingId_fkey" FOREIGN KEY ("DivyangServiceMappingId") REFERENCES "DivyangServiceMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SevaKendraFollowUp" ADD CONSTRAINT "SevaKendraFollowUp_divyangServiceMappingId_fkey" FOREIGN KEY ("divyangServiceMappingId") REFERENCES "DivyangServiceMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SevaKendraFollowUp" ADD CONSTRAINT "SevaKendraFollowUp_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SevaKendraFollowUp" ADD CONSTRAINT "SevaKendraFollowUp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonSevaKendraFollowUp" ADD CONSTRAINT "NonSevaKendraFollowUp_divyangServiceMappingId_fkey" FOREIGN KEY ("divyangServiceMappingId") REFERENCES "DivyangServiceMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabilityOfDivyang" ADD CONSTRAINT "DisabilityOfDivyang_divyangId_fkey" FOREIGN KEY ("divyangId") REFERENCES "DivyangDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabilityOfDivyang" ADD CONSTRAINT "DisabilityOfDivyang_disabilitySubTypeId_fkey" FOREIGN KEY ("disabilitySubTypeId") REFERENCES "DisabilitySubType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabilitySubType" ADD CONSTRAINT "DisabilitySubType_disabilityTypeId_fkey" FOREIGN KEY ("disabilityTypeId") REFERENCES "DisabilityType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MPConstituency" ADD CONSTRAINT "MPConstituency_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MLAConstituency" ADD CONSTRAINT "MLAConstituency_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanchayatUnion" ADD CONSTRAINT "PanchayatUnion_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TownPanchayat" ADD CONSTRAINT "TownPanchayat_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Corporation" ADD CONSTRAINT "Corporation_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taluk" ADD CONSTRAINT "Taluk_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangEducationalQualification" ADD CONSTRAINT "DivyangEducationalQualification_educationalQualificationId_fkey" FOREIGN KEY ("educationalQualificationId") REFERENCES "EducationQualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangEducationalQualification" ADD CONSTRAINT "DivyangEducationalQualification_DivyangDetailsId_fkey" FOREIGN KEY ("DivyangDetailsId") REFERENCES "DivyangDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationQualification" ADD CONSTRAINT "EducationQualification_educationQualificationTypeId_fkey" FOREIGN KEY ("educationQualificationTypeId") REFERENCES "EducationQualificationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
