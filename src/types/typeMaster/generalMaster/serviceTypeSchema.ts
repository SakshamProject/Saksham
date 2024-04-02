
import { z } from "zod";
import inputFieldSchema from "../../inputField.js";
import { Prisma, PrismaClient } from "@prisma/client";


type getServiceTypeWithServiceSchema = Prisma.ServiceTypeGetPayload<{
    select:{
        id: true, 
        name: true,
        service: { 
            select: {
                name: true,
            },
        },
    },
}>;

const postRequestSchema= z.object({
    id: inputFieldSchema.optional(),
    serviceType: inputFieldSchema.transform((value) => value.toUpperCase()),
    serviceName:z.array(inputFieldSchema).transform((value) => value.map((serviceName) => serviceName.toUpperCase())),

})

type postRequestSchemaType = z.infer<typeof postRequestSchema>;

type postServiceTypeType = Prisma.ServiceTypeCreateInput;

type postServiceType = Prisma.ServiceCreateInput;

  export{getServiceTypeWithServiceSchema, postRequestSchema, postRequestSchemaType,postServiceTypeType ,postServiceType};