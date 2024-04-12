import {AuditLogStatusEnum} from "@prisma/client";
import {userOrderByEnum} from "../../../../types/users/usersSchema.js";

const usersDefaults = {
    currentStatus: AuditLogStatusEnum.ACTIVE,
    orderBy: userOrderByEnum.createdAt,
}

export default usersDefaults;