-- AddForeignKey
ALTER TABLE "SevaKendra" ADD CONSTRAINT "SevaKendra_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
