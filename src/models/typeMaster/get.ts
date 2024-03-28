import { Prisma } from "@prisma/client";

type getDistrictsWithState = Prisma.DistrictGetPayload<{
  include: { state: true };
}>;
type getDistrict = Prisma.DistrictGetPayload<{}>;
type getState = Prisma.StateGetPayload<{}>;

export { getDistrictsWithState, getState, getDistrict };
