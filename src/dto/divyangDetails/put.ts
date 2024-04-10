import { Prisma } from '@prisma/client'
import { DivyangDetailsRequest } from '../../types/divyangDetails/divyangDetailsSchema.js'

const updatePersonalDetailsDBObject = (
  divyangDetails: DivyangDetailsRequest,
): Prisma.DivyangDetailsUpdateInput => {
  const updatePersonalDetails: Prisma.DivyangDetailsUpdateInput = {
    divyangId: divyangDetails.personalDetails.divyangId,
    firstName: divyangDetails.personalDetails.firstName,
    lastName: divyangDetails.personalDetails.lastName,
    bloodGroup: divyangDetails.personalDetails.bloodGroup,
    gender: divyangDetails.personalDetails.gender,
    dateOfBirth: divyangDetails.personalDetails.dateOfBirth,
    mailId: divyangDetails.personalDetails.mailId,
    mobileNumber: divyangDetails.personalDetails.mobileNumber,
    fatherName: divyangDetails.personalDetails.fatherName,
    motherName: divyangDetails.personalDetails.motherName,
    religion: divyangDetails.personalDetails.religion,
    communityCategory: {
      connect: {
        id: divyangDetails.personalDetails.communityCategoryId,
      },
    },
  }
  return updatePersonalDetails
}

const updateAddressDBObject = (
  divyangDetails: DivyangDetailsRequest,
): Prisma.DivyangDetailsUpdateInput => {
  const updateAddress: Prisma.DivyangDetailsUpdateInput = {
    doorNumber: divyangDetails.addressRequest.doorNumber,
    flatNumber: divyangDetails.addressRequest.flatNumber,
    streetName: divyangDetails.addressRequest.streetName,
    nagarName: divyangDetails.addressRequest.nagarName,
    district: {
      connect: {
        id: divyangDetails.addressRequest.districtId,
      },
    },
    isRural: divyangDetails.addressRequest.isRural,
    villageName: divyangDetails.addressRequest.villageName,
    panchayatUnion: {
      connect: {
        id: divyangDetails.addressRequest.panchayatUnionId,
      },
    },
    taluk: {
      connect: {
        id: divyangDetails.addressRequest.talukId,
      },
    },
    townPanchayat: {
      connect: {
        id: divyangDetails.addressRequest.townPanchayatId,
      },
    },
    municipality: {
      connect: {
        id: divyangDetails.addressRequest.municipalityId,
      },
    },
    corporation: {
      connect: {
        id: divyangDetails.addressRequest.corporationId,
      },
    },
    mlaconstituency: {
      connect: {
        id: divyangDetails.addressRequest.MLAConstituencyId,
      },
    },
    mpconstituency: {
      connect: {
        id: divyangDetails.addressRequest.MPConstituancyId,
      },
    },
    pincode: divyangDetails.addressRequest.pincode,
  }
  return updateAddress
}

const updateEmploymentDetailsDBObject = (
  divyangDetails: DivyangDetailsRequest,
): Prisma.DivyangDetailsUpdateInput => {
  const updateEmploymentDetails: Prisma.DivyangDetailsUpdateInput = {
    isEmployed: divyangDetails.employmentDetails.isEmployed,
    unemployedSince: divyangDetails.employmentDetails.unemployedSince,
    occupation: divyangDetails.employmentDetails.occupation,
    income: divyangDetails.employmentDetails.income,
    fatherOccupation: divyangDetails.employmentDetails.fatherOccupation,
    fatherIncome: divyangDetails.employmentDetails.fatherIncome,
    motherOccupation: divyangDetails.employmentDetails.motherOccupation,
    motherIncome: divyangDetails.employmentDetails.motherIncome,
    spouseOccupation: divyangDetails.employmentDetails.spouseOccupation,
    spouseIncome: divyangDetails.employmentDetails.spouseIncome,
  }
  return updateEmploymentDetails
}

const updateIdProofUploadsDBObject = (
  divyangDetails: DivyangDetailsRequest,
): Prisma.DivyangDetailsUpdateInput => {
  const updateEmploymentDetails: Prisma.DivyangDetailsUpdateInput = {
    voterId: divyangDetails.IdProofUploads.voterId,
    panCardNumber: divyangDetails.IdProofUploads.panCardNumber,
    drivingLicense: divyangDetails.IdProofUploads.drivingLicense,
    rationCardNumber: divyangDetails.IdProofUploads.rationCardNumber,
    aadharCardNumber: divyangDetails.IdProofUploads.aadharCardNumber,
    pensionCardNumber: divyangDetails.IdProofUploads.pensionCardNumber,
    medicalInsuranceNumber:
      divyangDetails.IdProofUploads.medicalInsuranceNumber,
    disabilitySchemeNumber:
      divyangDetails.IdProofUploads.disabilitySchemeNumber,
    BPL_OR_APL_Number: divyangDetails.IdProofUploads.BPL_OR_APL_Number,
  }
  return updateEmploymentDetails
}

const updateDisabilityDetailsDBObject = (
  divyangDetails: DivyangDetailsRequest,
): Prisma.DivyangDetailsUpdateInput => {
  const updateEmploymentDetails: Prisma.DivyangDetailsUpdateInput = {
    isDisabilitySinceBirth:
      divyangDetails.disabiltyDetails.isDisabilitySinceBirth,
    disabilitySince: divyangDetails.disabiltyDetails.disabilitySince,
    disabilityArea: divyangDetails.disabiltyDetails.disabilityArea,
    disabilityPercentage: divyangDetails.disabiltyDetails.disabilityPercentage,
    disabilityDueTo: divyangDetails.disabiltyDetails.disabilityDueTo,
    certificateIssueAuthority:
      divyangDetails.disabiltyDetails.certificateIssueAuthority,
    disabilityCardUrl: divyangDetails.disabiltyDetails.disabilityCardUrl,
    disabilityDistrictId: divyangDetails.disabiltyDetails.disabilityDistrictId,
    identityCardNumber: divyangDetails.disabiltyDetails.identityCardNumber,
    udidCardNumber: divyangDetails.disabiltyDetails.udidCardNumber,
    udidEnrollmentNumber: divyangDetails.disabiltyDetails.udidEnrollmentNumber,
    udidCardUrl: divyangDetails.disabiltyDetails.udidCardUrl,
  }
  return updateEmploymentDetails
}

function createUpdateDTOObject(
  pageNumber: number,
  DivyangDetailsRequest: DivyangDetailsRequest,
) {
  if (pageNumber === 1) {
    return updatePersonalDetailsDBObject(DivyangDetailsRequest)
  }
  else if (pageNumber === 2) {
    return updateAddressDBObject(DivyangDetailsRequest)
  }
  else if (pageNumber === 3) {
    return updateEmploymentDetailsDBObject(DivyangDetailsRequest)
  }
  else if (pageNumber === 4) {
    return updateDisabilityDetailsDBObject(DivyangDetailsRequest)
  }
  else if (pageNumber === 5) {
    return updateIdProofUploadsDBObject(DivyangDetailsRequest)
  }
  else {
    console.log("Error - Enter a valid page number")
  }
}

export {
  updateAddressDBObject,
  updateDisabilityDetailsDBObject,
  updateEmploymentDetailsDBObject,
  updateIdProofUploadsDBObject,
  updatePersonalDetailsDBObject,
  createUpdateDTOObject
}
