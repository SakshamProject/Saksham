-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'TRANSGENDER', 'OTHERS');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('O_POSITIVE', 'O_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'A_POSITIVE', 'A_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'HH', 'others');

-- CreateTable
CREATE TABLE "SevaKendra" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "landLineNumber" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "contactPersonId" TEXT NOT NULL,

    CONSTRAINT "SevaKendra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactPerson" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber1" TEXT NOT NULL,
    "phoneNumber2" TEXT NOT NULL,

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

    CONSTRAINT "ServiceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serviceTypeId" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
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
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "sevaKendraId" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "passwordId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sevaKendraId" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesOnRoles" (
    "id" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "assignedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedById" TEXT NOT NULL,

    CONSTRAINT "FeaturesOnRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DivyangPersonalDetails" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "divyangId" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "bloodGroup" "BloodGroup" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "age" INTEGER NOT NULL,
    "mailId" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "isMarried" BOOLEAN NOT NULL,
    "spouseName" TEXT,
    "spouseNumber" TEXT,
    "religion" TEXT NOT NULL,
    "communityCategoryId" TEXT NOT NULL,
    "extraCurricularActivity" TEXT NOT NULL,
    "voterId" TEXT NOT NULL,
    "panCardNumber" TEXT NOT NULL,
    "drivingLicense" TEXT NOT NULL,
    "rationCardNumber" TEXT NOT NULL,
    "aadharCardNumber" TEXT NOT NULL,
    "pensionCardNumber" TEXT NOT NULL,
    "medicalInsuranceNumber" TEXT NOT NULL,
    "disabilitySchemeNumber" TEXT NOT NULL,
    "BPL_OR_APL_Number" TEXT NOT NULL,
    "doorNumber" TEXT NOT NULL,
    "flatNumber" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "nagarName" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "villageName" TEXT,
    "panchayatUnion" TEXT,
    "taluk" TEXT,
    "townPanchayat" TEXT,
    "municipality" TEXT,
    "corporation" TEXT,
    "MLAConstituency" TEXT,
    "MPConstituancy" TEXT,
    "pincode" INTEGER,
    "isDisabilitySinceBirth" BOOLEAN NOT NULL,
    "disabilitySince" TIMESTAMP(3),
    "disabilityArea" TEXT NOT NULL,
    "disabilityPercentage" TEXT NOT NULL,
    "disabilityDueTo" TEXT NOT NULL,
    "certificateIssueAuthority" TEXT NOT NULL,
    "disabilityCardUrl" TEXT NOT NULL,
    "disabilityDistrictId" TEXT NOT NULL,
    "identityCardNumber" TEXT NOT NULL,
    "udidCardNumber" TEXT NOT NULL,
    "udidEnrollmentNumber" TEXT NOT NULL,
    "udidCardUrl" TEXT NOT NULL,
    "isEmployed" BOOLEAN NOT NULL,
    "unemployedSince" TIMESTAMP(3) NOT NULL,
    "occupation" TEXT NOT NULL,
    "income" INTEGER NOT NULL,
    "fatherOccupation" TEXT NOT NULL,
    "fatherIncome" INTEGER NOT NULL,
    "motherOccupation" TEXT NOT NULL,
    "motherIncome" INTEGER NOT NULL,
    "spouseOccupation" TEXT NOT NULL,
    "spouseIncome" INTEGER NOT NULL,

    CONSTRAINT "DivyangPersonalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DivyangServiceMapping" (
    "id" TEXT NOT NULL,
    "divyangId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceSubType" INTEGER NOT NULL,
    "dateOfService" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isFollowUpRequired" BOOLEAN NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "completedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DivyangServiceMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sendMail" BOOLEAN NOT NULL,
    "divyangServiceMappingId" TEXT NOT NULL,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "MPConstituency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MLAConstituency" (
    "Id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MLAConstituency_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "PanchayatUnion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PanchayatUnion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TownPanchayat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TownPanchayat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corporation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Corporation_pkey" PRIMARY KEY ("id")
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
    "divyangPersonalDetailsId" TEXT NOT NULL,
    "educationalQualificationId" TEXT NOT NULL,

    CONSTRAINT "DivyangEducationalQualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationQualification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EducationQualification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordId_key" ON "User"("passwordId");

-- CreateIndex
CREATE UNIQUE INDEX "DisabilityOfDivyang_disabilitySubTypeId_key" ON "DisabilityOfDivyang"("disabilitySubTypeId");

-- AddForeignKey
ALTER TABLE "SevaKendra" ADD CONSTRAINT "SevaKendra_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SevaKendra" ADD CONSTRAINT "SevaKendra_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "ContactPerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnSevaKendras" ADD CONSTRAINT "ServicesOnSevaKendras_sevakendraId_fkey" FOREIGN KEY ("sevakendraId") REFERENCES "SevaKendra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnSevaKendras" ADD CONSTRAINT "ServicesOnSevaKendras_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_passwordId_fkey" FOREIGN KEY ("passwordId") REFERENCES "UserPassword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sevaKendraId_fkey" FOREIGN KEY ("sevaKendraId") REFERENCES "SevaKendra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_sevaKendraId_fkey" FOREIGN KEY ("sevaKendraId") REFERENCES "SevaKendra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesOnRoles" ADD CONSTRAINT "FeaturesOnRoles_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesOnRoles" ADD CONSTRAINT "FeaturesOnRoles_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesOnRoles" ADD CONSTRAINT "FeaturesOnRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangPersonalDetails" ADD CONSTRAINT "DivyangPersonalDetails_communityCategoryId_fkey" FOREIGN KEY ("communityCategoryId") REFERENCES "CommunityCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangPersonalDetails" ADD CONSTRAINT "DivyangPersonalDetails_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_divyangServiceMappingId_fkey" FOREIGN KEY ("divyangServiceMappingId") REFERENCES "DivyangServiceMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabilityOfDivyang" ADD CONSTRAINT "DisabilityOfDivyang_divyangId_fkey" FOREIGN KEY ("divyangId") REFERENCES "DivyangPersonalDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabilityOfDivyang" ADD CONSTRAINT "DisabilityOfDivyang_disabilitySubTypeId_fkey" FOREIGN KEY ("disabilitySubTypeId") REFERENCES "DisabilitySubType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabilitySubType" ADD CONSTRAINT "DisabilitySubType_disabilityTypeId_fkey" FOREIGN KEY ("disabilityTypeId") REFERENCES "DisabilityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangEducationalQualification" ADD CONSTRAINT "DivyangEducationalQualification_educationalQualificationId_fkey" FOREIGN KEY ("educationalQualificationId") REFERENCES "EducationQualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivyangEducationalQualification" ADD CONSTRAINT "DivyangEducationalQualification_divyangPersonalDetailsId_fkey" FOREIGN KEY ("divyangPersonalDetailsId") REFERENCES "DivyangPersonalDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
