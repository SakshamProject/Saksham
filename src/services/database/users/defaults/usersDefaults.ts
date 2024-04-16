import {AuditLogStatusEnum, Prisma} from "@prisma/client";
import {userOrderByEnum} from "../../../../types/users/usersSchema.js";

const usersDefaults = {
    currentStatus: AuditLogStatusEnum.ACTIVE,
    orderBy: userOrderByEnum.createdAt,
    includeAll: Prisma.validator<Prisma.UserInclude>()({
        designation: {
            include: {
                sevaKendra: {
                    include: {
                        district: {
                            include: {
                                state: true,
                            }
                        }
                    }
                }
            }
        }
    }),

    select: Prisma.validator<Prisma.UserSelect>()({
        id: true,
        firstName: true,
        lastName: true,
        designation: {
            select: {
                name: true,
                sevaKendra: {
                    select: {
                        name: true,
                        district: {
                            select: {
                                name: true,
                                state: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export default usersDefaults;