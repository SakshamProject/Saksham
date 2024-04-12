import { z } from "zod";
import inputFieldSchema, { dateSchema, emailSchema, phoneNumberSchema, uuidSchema } from "../inputFieldSchema.js";

const nonSevaKendraFollowUpSchema = z.object({
name:inputFieldSchema,
mobile:phoneNumberSchema,
email:emailSchema,
sendEmail:z.boolean()
})

const postServiceMappingRequestSchema = z.object({
 
divyangId : uuidSchema,     
sevaKendraId:uuidSchema,
userId:uuidSchema,
serviceId:uuidSchema,
dateOfService:dateSchema,
dueDate:dateSchema,
isNonSevaKendraVolunteerRequired:z.boolean(),
nonSevaKendraFollowUp:nonSevaKendraFollowUpSchema
 
}).refine((data)=>{
    if(data.sevaKendraId){
        return data.userId!==undefined&&data.nonSevaKendraFollowUp==undefined
    }else{
        return data.sevaKendraId!==undefined&&data.userId!==undefined&&data.nonSevaKendraFollowUp==undefined
    }
}).transform(data => ({
    ...data,
    isNonSevaKendraVolunteerRequired: data.sevaKendraId ? false : true
  }));