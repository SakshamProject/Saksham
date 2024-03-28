import { Prisma } from "@prisma/client";
import { z } from "zod";
import inputFieldSchema from "../../inputField.js";

type getDistrictsWithStateSchema = Prisma.DistrictGetPayload<{
  include: { state: true };
}>;
type getDistrictSchema = Prisma.DistrictGetPayload<{}>;

const districtSchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema,
  stateId: inputFieldSchema,
});
type District = z.infer<typeof districtSchema>;

export {
  getDistrictSchema,
  getDistrictsWithStateSchema,
  District,
  districtSchema,
};
