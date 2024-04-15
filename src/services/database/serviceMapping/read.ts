import { Prisma } from "@prisma/client";
import defaults from "../../../defaults.js";

const getServiceMappingDB = (
  prismaTransaction: Prisma.TransactionClient,
  skip: number = defaults.skip,
  take: number = defaults.take
) => {};
