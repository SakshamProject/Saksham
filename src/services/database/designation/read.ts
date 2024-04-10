import defaults from "../../../defaults.js";
// import { DesignationResponse } from "../../../models/designation/designation.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import { DesignationsearchCondition, designationColumnNameMapper } from "../utils/designation/designation.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import { Prisma, PrismaClient } from "@prisma/client";

async function getDesignationDB(
  prismaTransaction:Prisma.TransactionClient,
  skip: number = defaults.skip,
  take: number = defaults.take,
  orderByColumn: string = "",
  sortOrder: sortOrderEnum = sortOrderEnum.ascending,
  searchText:string = ""
){
 
  try {
    const results = await prismaTransaction.designation.findMany({  
      skip: skip,
     take: take,
      select:{
        id:true,
        name:true,
        sevaKendra:{
          select:{
            name:true,
            district:{
              select:{
                name:true,
                state:{
                  select:{
                    name:true
                  }
                }
              }
            }}
          
        }
     },
      where:{
        OR:[{
          name:{
            contains:searchText,
            mode:"insensitive"
          }
        },{
          sevaKendra:{
            name:{
              contains:searchText,
              mode:"insensitive"
            }
          }
        },
        {
          sevaKendra:{
            district:{
              name:{
                contains:searchText,
                mode:"insensitive"
              }
            }
          }        },
        {
          sevaKendra:{
            district:{
              state:{
                name:{
                  contains:searchText,
                  mode:"insensitive"
                }
              }
            }
          }
        }
        ]
    },
  
      orderBy: designationColumnNameMapper(orderByColumn, sortOrder),
    });
    return results;
  } catch (err) {
    if(err instanceof Error){
      throwDatabaseError(err);    }
  }
}

async function getDesignationDBTotal( 
  prismaTransaction:Prisma.TransactionClient,
  skip: number = defaults.skip,
  take: number = defaults.take,
  orderByColumn: string = "",
  sortOrder: sortOrderEnum = sortOrderEnum.ascending,
  searchText:string = ""){
    try {
      const total:number = await prismaTransaction.designation.count({  
      
        where:{
          OR:[{
            name:{
              contains:searchText,
              mode:"insensitive"
            }
          },{
            sevaKendra:{
              name:{
                contains:searchText,
                mode:"insensitive"
              }
            }
          },
          {
            sevaKendra:{
              district:{
                name:{
                  contains:searchText,
                  mode:"insensitive"
                }
              }
            }
          },
          {
            sevaKendra:{
              district:{
                state:{
                  name:{
                    contains:searchText,
                    mode:"insensitive"
                  }
                }
              }
            }
          }
          ]
      },
    
        orderBy: designationColumnNameMapper(orderByColumn, sortOrder),
      });
      return total;
    } catch (err) {
      if(err instanceof Error){
        throwDatabaseError(err);    }
    }

}

async function getDesignationByIDDB(id: string | undefined) {
  try {
    const designation = await prisma.designation.findUnique({
      where: {
        id: id,
      },
      select:{
        id:true,
        name:true,
        sevaKendra:{
          select:{
            id:true,
            name:true,
            district:{
              select:{
                id:true,
                name:true,
                state:{
                  select:{
                    id:true,
                    name:true
                  }
                }
              }
            }
          }
        },
        features:{
          select:{
            feature:{
              select:{
                id:true,
                name:true
              }
            }
          }
        },
        createdAt:true,
        createdBy:{
          select:{
            id:true,
            firstName:true,
            lastName:true,
          }
        },
        updatedAt:true,
        updatedBy:{
          select:{
            id:true,
            firstName:true,
            lastName:true
          }
        },
        designationAuditLog:{
          select:{
            status:true,
            date:true,
            description:true

          }
        }
      }
    });

    return designation;
  } catch (err) {
    return err;
  }
}

async function getFeaturesIdByDesignationIdDB(prismaTransaction:Prisma.TransactionClient,id:string){
  try{
    const FeaturesOnDesignation = prismaTransaction.featuresOnDesignations.findMany({
      where:{
        designationId:id
      },
      
    })
    return FeaturesOnDesignation
  }catch(err){
    if(err instanceof Error){
      throwDatabaseError(err);
    }
  }

}

export { getDesignationDB, getDesignationByIDDB, getDesignationDBTotal ,getFeaturesIdByDesignationIdDB};
