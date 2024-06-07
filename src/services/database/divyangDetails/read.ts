import { Prisma, StatusEnum } from "@prisma/client";
import {
  DivyangDetailsSearchType,
  DivyangDetailsWhere,
} from "../../../types/divyangDetails/divyangDetailsSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const getDivyangDetailsDB = async (
  prismaTransaction: Prisma.TransactionClient,
  orderByColumnAndSortOrder: Object,
  divyangDetailsWhereInput: DivyangDetailsWhere,
  skip: number,
  take: number
) => {
  try {
    const divyangsDetails = await prismaTransaction.divyangDetails.findMany({
      select: {
        id: true,
        personId: true,
        firstName: true,
        lastName: true,
        mailId: true,
        mobileNumber: true,
        divyangId: true,
      },
      orderBy: orderByColumnAndSortOrder,
      where: divyangDetailsWhereInput,
      skip: skip,
      take: take,
    });

    return divyangsDetails;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

async function getDivyangDetailsByPersonIdDB(personId: string) {
  try {
    const divyangDetails = await prisma.divyangDetails.findFirstOrThrow({
      include: {
        disabilities: true,
      },
      where: {
        personId: personId,
      },
    });
    return divyangDetails;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

const getDivyangDetailsByIdDB = async (id: string) => {
  try {
    const divyangDetails = await prisma.divyangDetails.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        corporation: true,
        mlaconstituency: true,
        mpconstituency: true,
        municipality: true,
        townPanchayat: true,
        taluk: true,
        panchayatUnion: true,
        district: {
          include: { state: true },
        },
        corporationCommunication: true,
        mlaconstituencyCommunication: true,
        mpconstituencyCommunication: true,
        municipalityCommunication: true,
        townPanchayatCommunication: true,
        talukCommunication: true,
        panchayatUnionCommunication: true,
        districtCommunication: {
          include: { state: true },
        },
        person: {
          select: {
            id: true,
            userName: true,
          },
        },
        auditLog: true,
        communityCategory: true,
        createdBy: {
          select: {
            id: true,
            userName: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            userName: true,
          },
        },
        disabilities: {
          include: {
            disabilityType: true,
            disabilitySubType: true,
          },
        },
        educationQualifications: {
          include: {
            educationQualification: true,
            educationQualificationType: true,
          },
        },
        services: true,
      },
    });
    return divyangDetails;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

async function getDivyangDetailsTotalDB(
  prismaTransaction: any,
  divyangDetailsWhereInput: DivyangDetailsWhere
) {
  try {
    const divyangDetails: number = await prismaTransaction.DivyangDetails.count(
      {
        where: divyangDetailsWhereInput,
      }
    );
    return divyangDetails;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

const getDivyangDetailsSearchByColumnDB = async (
  divyangDetailsSearch: DivyangDetailsSearchType
) => {
  try {
    const divyangDetails = await prisma.divyangDetails.findMany({
      where: {
        [divyangDetailsSearch.column]: divyangDetailsSearch.value,
      },
      orderBy: {
        firstName: "asc",
      },
    });
    return divyangDetails;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getDivyangDetailsStatusDB = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangDetailsId: string,
  currentDate: string
) => {
  try {
    const divyangDetailsAuditLog =
      await prismaTransaction.divyangDetailsAuditLog.findFirstOrThrow({
        where: {
          AND: [
            { divyangDetailsId: divyangDetailsId },
            {
              date: {
                lte: currentDate,
              },
            },
          ],
        },
        orderBy: {
          date: "desc",
        },
        take: 1,
      });
    return divyangDetailsAuditLog;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getDivyangDisabilitiesByPersonIdDB = async (
  prismaTransaction: Prisma.TransactionClient,
  personId: string
) => {
  try {
    const disabilityOfDivyang =
      await prismaTransaction.disabilityOfDivyang.findMany({
        where: {
          divyang: {
            personId: personId,
          },
        },
      });
    return disabilityOfDivyang;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getDisabilityOfDivyangByDivyangIdDB = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangId: string
) => {
  try {
    const disabilityOfDivyang =
      await prismaTransaction.disabilityOfDivyang.findMany({
        where: {
          divyangId: divyangId,
        },
      });
    return disabilityOfDivyang;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getDivyangDetailsDependencyStatusDB = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangId: string
) => {
  try {
    const divyang = await prismaTransaction.divyangDetails.findFirst({
      where: {
        id: divyangId,
      },
      include: {
        services: {
          where: {
            isCompleted: StatusEnum.PENDING,
          },
        },
      },
    });
    const dependencyStatus = !(
      divyang?.services.length === 0 || divyang === null
    );
    return dependencyStatus;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getEducationQualificationOfDivyangByDivyangIdDB = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangId: string
) => {
  try {
    const educationQualificationOfDivyang =
      await prismaTransaction.divyangEducationalQualification.findMany({
        where: {
          DivyangDetailsId: divyangId,
        },
      });
    return educationQualificationOfDivyang;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export {
  getDivyangDetailsDB,
  getDivyangDetailsTotalDB,
  getDivyangDetailsByIdDB,
  getDivyangDetailsSearchByColumnDB,
  getDivyangDetailsStatusDB,
  getDisabilityOfDivyangByDivyangIdDB,
  getDivyangDetailsDependencyStatusDB,
  getEducationQualificationOfDivyangByDivyangIdDB,
  getDivyangDetailsByPersonIdDB,
  getDivyangDisabilitiesByPersonIdDB,
};
