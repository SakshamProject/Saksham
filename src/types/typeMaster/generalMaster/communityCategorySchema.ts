import { Prisma } from "@prisma/client";
import { z } from "zod";
import inputFieldSchema from "../../inputFieldSchema.js";

type getCommunityCategorySchema = Prisma.CommunityCategoryGetPayload<{}>;

const communityCategorySchema = z.object ({
    id: inputFieldSchema.optional(),
    name: z.string().toUpperCase()
})

type CommunityCategory = z.infer<typeof communityCategorySchema>

export { communityCategorySchema, CommunityCategory, getCommunityCategorySchema }