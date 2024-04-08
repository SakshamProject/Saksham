import {
  ContactPerson,
  SevaKendraRequestSchemaType,
  SevaKendraUpdate,
} from "../../types/sevaKendra/sevaKendra.js";

const updateSevaKendraDBObject = (
  sevaKendra: SevaKendraRequestSchemaType,
  updatedBy: string
) => {
  const sevaKendraDBObject: SevaKendraUpdate = {
    name: sevaKendra.name,
    district: {
      connect: { id: sevaKendra.districtId },
    },
    address: sevaKendra.address,
    mobileNumber: sevaKendra.mobileNumber,
    landLineNumber: sevaKendra.landLineNumber,
    startDate: sevaKendra.startDate,
    updatedBy: updatedBy,
    updatedAt: new Date().toISOString(),
  };
  return sevaKendraDBObject;
};

const updateContactPersonDBObject = (
  sevaKendra: SevaKendraRequestSchemaType
) => {
  const contactPersonDBObject: ContactPerson = {
    name: sevaKendra.contactPerson.name,
    email: sevaKendra.contactPerson.email,
    phoneNumber1: sevaKendra.contactPerson.phoneNumber1,
    phoneNumber2: sevaKendra.contactPerson.phoneNumber2,
  };
  return contactPersonDBObject;
};

export { updateSevaKendraDBObject, updateContactPersonDBObject };
