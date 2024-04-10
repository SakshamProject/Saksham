import { Prisma } from "@prisma/client";
import { DivyangDetailsRequest } from "../../types/divyangDetails/divyangDetailsSchema.js";

const createDivyangDetailsDBObject = (divyangDetails: DivyangDetailsRequest): Prisma.DivyangDetailsUncheckedCreateInput => {
    const newDivyangDetails: Prisma.DivyangDetailsUncheckedCreateInput = {
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
        communityCategoryId: divyangDetails.personalDetails.communityCategoryId,
        community: divyangDetails.personalDetails.community
    }
    return newDivyangDetails
}

export { createDivyangDetailsDBObject }