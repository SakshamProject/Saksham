import { Prisma } from "@prisma/client";

type getDistrictsWithState = Prisma.DistrictGetPayload<{
  include: { state: true };
}>;
type getState = Prisma.StateGetPayload<{}>;

export { getDistrictsWithState, getState };
