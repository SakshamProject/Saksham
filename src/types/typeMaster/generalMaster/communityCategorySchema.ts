import { Prisma } from "@prisma/client";
import inputFieldSchema from "../../inputField.js";
import { z } from "zod";

type getCommunityCategorySchema = Prisma.CommunityCategoryGetPayload<{}>;

const communityCategorySchema = z.object ({
    id: inputFieldSchema.optional(),
    name: z.string().toUpperCase()
})

type CommunityCategory = z.infer<typeof communityCategorySchema>

export { communityCategorySchema, CommunityCategory, getCommunityCategorySchema }