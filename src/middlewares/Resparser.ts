import { Service } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

async function previous(start:any, rows : any): Promise<object|null>  {
    try {
        let previous_field:object|null
        if (start !== 0) {
            previous_field = {
                start: start - rows,
                rows: rows
            }
        }
        else {
            previous_field = null
            
        }
        return previous_field
    }
    catch (error) {
        console.log(error)
        return null
    }
}
async function next(start:any, rows :any ,fields : any): Promise<object|null> {
    try {
        let next_field :object |null
        if (fields < rows ) {
            next_field = null
        }
        else {
            next_field = {
                start: start + rows,
                rows : rows
            }
        }
        return next_field
    }
    catch (error) {
        console.log(error)
        return null
    }
}
export {previous,next};
