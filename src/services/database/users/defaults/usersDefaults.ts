import {AuditLogStatusEnum} from "@prisma/client";

const usersDefaults = {
    currentStatus: AuditLogStatusEnum.ACTIVE
}

export default usersDefaults;