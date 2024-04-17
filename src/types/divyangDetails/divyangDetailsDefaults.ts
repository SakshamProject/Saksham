import { AuditLogStatusEnum } from '@prisma/client'

enum DivyangDetailsColumnNamesEnum {
  DIVYANG_NAME = 'divyangName',
  DIVYANG_ID = 'divyangId',
  EMAIL_ID = 'emailID',
  MOBILE_NUMBER = 'mobileNumber',
}

enum DivyangDetailsSearchColumnNamesEnum {
  AADHAR_NUMBER = 'aadharCardNumber',
  MOBILE_NUMBER = 'mobileNumber',
  DIVYANG_ID = 'divyangId',
  UDID_ID = 'udidCardNumber',
}
const DivyangDetailsAuditLogDefaults = {
  date: new Date(Date.now()).toISOString(),
  description: 'Divyang is updated',
  status: AuditLogStatusEnum.ACTIVE,
}
export {
  DivyangDetailsColumnNamesEnum,
  DivyangDetailsSearchColumnNamesEnum,
  DivyangDetailsAuditLogDefaults,
}
