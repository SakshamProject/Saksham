import inputFieldSchema from "../../inputFieldSchema.js";
import { z } from "zod";

const communityCategorySchema = z.object({
  id: inputFieldSchema,
  name: inputFieldSchema,
});

type CommunityCategory = z.infer<typeof communityCategorySchema>;

export { communityCategorySchema, CommunityCategory };
