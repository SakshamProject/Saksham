import { StatusEnum } from "@prisma/client";
import { ServiceMappingWhere } from "../../../../types/serviceMapping/serviceMappingScreens.js";

const ServiceMappingGlobalSearchConditions = (searchText: string = "") => {
  const searchConditions: ServiceMappingWhere = {
    OR: [
      {
        user: {
          designation: {
            sevaKendra: {
              district: {
                state: {
                  name: {
                    contains: searchText,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        },
      },
      {
        user: {
          designation: {
            sevaKendra: {
              district: {
                name: {
                  contains: searchText,
                  mode: "insensitive",
                },
              },
            },
          },
        },
      },
      {
        user: {
          designation: {
            sevaKendra: {
              name: {
                contains: searchText,
                mode: "insensitive",
              },
            },
          },
        },
      },
      {
        divyang: {
          firstName: {
            mode: "insensitive",
            contains: searchText,
          },
        },
      },
      {
        service: {
          name: {
            mode: "insensitive",
            contains: searchText,
          },
        },
      },
      {
        dateOfService: {
          equals: searchText,
        },
      },
      {
        isCompleted: {
          equals:
            StatusEnum.COMPLETED == searchText.toUpperCase()
              ? StatusEnum.COMPLETED
              : StatusEnum.PENDING,
        },
      },
    ],
  };
  return searchConditions;
};

export default ServiceMappingGlobalSearchConditions;
