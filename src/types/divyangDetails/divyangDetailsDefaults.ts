import { AuditLogStatusEnum } from "@prisma/client";

enum DivyangDetailsColumnNamesEnum {
  DIVYANG_FIRST_NAME = "divyangFirstName',
  DIVYANG_LAST_NAME= 'divyangLastName",
  DIVYANG_ID = "divyangId",
  EMAIL_ID = "emailID",
  MOBILE_NUMBER = "mobileNumber",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

enum DivyangDetailsSearchColumnNamesEnum {
  AADHAR_NUMBER = "aadharCardNumber",
  MOBILE_NUMBER = "mobileNumber",
  DIVYANG_ID = "divyangId",
  UDID_ID = "udidCardNumber",
}
const DivyangDetailsAuditLogDefaults = {
  date: new Date(Date.now()).toISOString(),
  description: "Divyang is updated",
  status: AuditLogStatusEnum.ACTIVE,
};
export {
  DivyangDetailsColumnNamesEnum,
  DivyangDetailsSearchColumnNamesEnum,
  DivyangDetailsAuditLogDefaults,
};
