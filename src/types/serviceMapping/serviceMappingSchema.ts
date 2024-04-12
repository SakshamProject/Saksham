import { z } from "zod";
import { dateSchema, uuidSchema } from "../inputFieldSchema.js";

const postServiceMappingRequestSchema = z.object({
//     id              
//   divyangId          
//   userId             
//   serviceId          
                              
//   dateOfService      
//   dueDate            

//   isCompleted  
divyangId : uuidSchema,     
sevaKendraId:uuidSchema,
userId:uuidSchema,
serviceId:uuidSchema,
dateOfService:dateSchema,
dueDate:dateSchema,



  
})