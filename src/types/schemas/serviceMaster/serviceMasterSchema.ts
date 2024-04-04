
import { z } from "zod";
import { filter, inputFieldSchema } from "../../zodSchemas.js";

const postServiceMasterSchema = z.object({
    serviceTypeId: z.string().uuid(),
    name: inputFieldSchema
});

type postServiceMasterType = z.infer<typeof postServiceMasterSchema>;

const filterServiceMasterSchema = z.object({
    service: filter.optional(),
    serviceName: filter.optional()
});

type filterServiceMasterType = z.infer<typeof filterServiceMasterSchema>;


const putServiceMasterSchema = z.object({
    serviceTypeId: z.string().uuid(),
    name: inputFieldSchema
});
type putServiceMasterType = z.infer<typeof putServiceMasterSchema>;

export {
    postServiceMasterSchema, putServiceMasterSchema, filterServiceMasterSchema,
    postServiceMasterType, putServiceMasterType, filterServiceMasterType
};