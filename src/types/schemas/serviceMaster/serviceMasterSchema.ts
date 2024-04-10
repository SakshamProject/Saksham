import { z } from "zod";
import inputFieldSchema, { filter } from "../../inputFieldSchema.js";

const postServiceMasterSchema = z.object({
  serviceTypeId: z.string().uuid(),
  name: inputFieldSchema.toUpperCase(),
});

type postServiceMasterType = z.infer<typeof postServiceMasterSchema>;

const filterServiceMasterSchema = z.object({
  serviceName: filter.optional(),
  serviceTypeName: filter.optional(),
});

type filterServiceMasterType = z.infer<typeof filterServiceMasterSchema>;

const putServiceMasterSchema = z.object({
  serviceTypeId: z.string().uuid(),
  name: inputFieldSchema.toUpperCase(),
});
type putServiceMasterType = z.infer<typeof putServiceMasterSchema>;

export {
  postServiceMasterSchema,
  putServiceMasterSchema,
  filterServiceMasterSchema,
  postServiceMasterType,
  putServiceMasterType,
  filterServiceMasterType,
};
