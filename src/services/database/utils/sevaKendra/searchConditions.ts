import { SevaKendraColumnNameSchema } from "../../../../types/sevaKendra/sevaKendra.js";

const SevaKendraSearchConditions = (searchText: string = "") => {
  const searchConditions = {
    OR: [
      {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
      {
        district: {
          state: {
            name: {
              contains: searchText,
              mode: "insensitive",
            },
          },
        },
      },
      {
        district: {
          name: {
            contains: searchText,
            mode: "insensitive",
          },
        },
      },
      {
        contactPerson: {
          name: {
            contains: searchText,
            mode: "insensitive",
          },
        },
      },
      {
        contactPerson: {
          phoneNumber1: {
            mode: "insensitive",
            contains: searchText,
          },
        },
      },
    ],
  };
  return searchConditions;
};

export default SevaKendraSearchConditions;
