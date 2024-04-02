import { Prisma } from "@prisma/client";
import inputFieldSchema from "../../inputField.js";
import { z } from "zod";

type getCommunityCategorySchema = Prisma.CommunityCategoryGetPayload<{}>;

const communityCategorySchema = z.object ({
    id: inputFieldSchema,
    name: inputFieldSchema
})

type CommunityCategory = z.infer<typeof communityCategorySchema>

export { communityCategorySchema, CommunityCategory, getCommunityCategorySchema }