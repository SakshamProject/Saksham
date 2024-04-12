/*
  Warnings:

  - You are about to drop the `FeaturesOnRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeaturesOnRoles" DROP CONSTRAINT "FeaturesOnRoles_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "FeaturesOnRoles" DROP CONSTRAINT "FeaturesOnRoles_featureId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturesOnRoles" DROP CONSTRAINT "FeaturesOnRoles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_sevaKendraId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropTable
DROP TABLE "FeaturesOnRoles";

-- DropTable
DROP TABLE "Role";

-- CreateTable
CREATE TABLE "Designation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sevaKendraId" TEXT NOT NULL,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesOnDesignations" (
    "id" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "assignedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedById" TEXT NOT NULL,

    CONSTRAINT "FeaturesOnDesignations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_sevaKendraId_fkey" FOREIGN KEY ("sevaKendraId") REFERENCES "SevaKendra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesOnDesignations" ADD CONSTRAINT "FeaturesOnDesignations_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesOnDesignations" ADD CONSTRAINT "FeaturesOnDesignations_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesOnDesignations" ADD CONSTRAINT "FeaturesOnDesignations_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
