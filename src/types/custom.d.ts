import {Prisma} from "@prisma/client";
import {getServicesDB} from "../services/database/serviceMaster/serviceMaster.js";

declare namespace Express {
    export interface Request {
        serviceID: string
    }
}

type getServices = Prisma.PromiseReturnType<typeof getServicesDB>;
type results = getServices;

export { results };