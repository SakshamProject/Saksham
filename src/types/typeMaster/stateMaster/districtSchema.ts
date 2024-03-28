import { Prisma } from "@prisma/client";
import { z } from "zod";
import inputFieldSchema from "../../inputField.js";

type getDistrictsWithState = Prisma.DistrictGetPayload<{
  include: { state: true };
}>;
type getDistrict = Prisma.DistrictGetPayload<{}>;

const districtSchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema,
  stateId: inputFieldSchema,
});
type District = z.infer<typeof districtSchema>;

export { getDistrictsWithState, getDistrict, District, districtSchema };
