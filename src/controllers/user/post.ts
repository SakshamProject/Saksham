import {Response, Request, NextFunction} from "express";
import usersSchema from "../../types/users/usersSchema.js";

async function postService(request: Request, response: Response, next: NextFunction) {
    try {
        const body = usersSchema.parse(request.body);
        response.json({message: "Under Construction"});
    } catch(error) {
        next(error);
    }
}