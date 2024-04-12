import defaults from "../../../defaults.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import { Prisma } from "@prisma/client";

async function getUserDB(
    prismaTransaction:Prisma.TransactionClient,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    orderBy:string,
    searchText: string = ""
    ) {
    try {
          const results = await prismaTransaction.user.findMany({
            include: {
              designation : {
                include: {
                        sevaKendra: {
                        include: {
                                district: {
                                include: {
                                        state:true
                                    }
                            }
                        }
                    }
                }
              },
            },
            orderBy: {
              firstName: sortOrder,
            },
            where: {
              OR: [
                {
                    firstName: {
                        contains: searchText,
                        mode: "insensitive",
                    },
                },
                {
                  designation: {
                    name: {
                      contains: searchText,
                      mode: "insensitive",
                    },
                    sevaKendra: {
                      OR: [
                        {
                          name: {
                            contains: searchText,
                            mode: "insensitive",
                          },
                          district: {
                            OR: [
                              {
                                name: {
                                  contains: searchText,
                                  mode: "insensitive",
                                },
                                state: {
                                  OR: [
                                    {
                                      name: {
                                        contains: searchText,
                                        mode: "insensitive",
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            },
          });
          return results;
        } catch (err) {
      if (err instanceof Error) {
            throwDatabaseError(err);
          }
        }
      }
async function getUserTotal(
    prismaTransaction: Prisma.TransactionClient,
    searchText: string = ""
) {
    try {
      const userTotal: number =
        await prismaTransaction.user.count({
          where: {
            OR: [
              {
                firstName: {
                  contains: searchText,
                  mode: "insensitive",
                },
                OR: [
                  {
                    designation: {
                      name: {
                        contains: searchText,
                        mode: "insensitive",
                      },
                      OR: [{
                        sevaKendra: {
                          name: {
                            contains: searchText,
                            mode: "insensitive",
                          },
                          OR: [{
                            district: {
                              name: {
                                contains: searchText,
                                mode: "insensitive",
                              },
                              OR: [{
                                state: {
                                  name: {
                                    contains: searchText,
                                    mode: "insensitive",
                                  }
                                }
                              }]
                            }
                          }]
                        }
                      }]
                    }
                  }]
              }]
          },
        });
        return userTotal;
      } catch (err) {
        if (err instanceof Error) {
          throwDatabaseError(err);
        }
      }
}
const getUserByIdDB = async (id: string) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      include: {
        designation: {
          include: {
            sevaKendra: {
              include: {
                district: {
                  include: {
                    state: true
                  }
                }
              }
            }
          }
        },
      },
      where: {
        id: id,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throwDatabaseError(error);
      }
    }
  };
 
export {getUserDB,getUserTotal,getUserByIdDB}