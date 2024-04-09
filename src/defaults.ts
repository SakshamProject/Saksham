import {Prisma} from "@prisma/client";

type Defaults = {
    skip: number,
    take: number,
    minFieldLength: number,
    sortOrder: "asc" | "desc"
    transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel,
        maxWait: number,
        timeout: number
    }
}
const defaults: Defaults = {
    skip : 0,
    take : 10,
    minFieldLength: 3,
    sortOrder: "asc",
    transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 50000,
        timeout: 10000,
    }
}

export default defaults;