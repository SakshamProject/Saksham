/*
  Warnings:

  - The primary key for the `District` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `State` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_stateId_fkey";

-- AlterTable
ALTER TABLE "District" DROP CONSTRAINT "District_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "stateId" SET DATA TYPE TEXT,
ADD CONSTRAINT "District_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "District_id_seq";

-- AlterTable
ALTER TABLE "State" DROP CONSTRAINT "State_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "State_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "State_id_seq";

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
