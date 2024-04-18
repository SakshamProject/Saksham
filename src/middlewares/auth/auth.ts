import { NextFunction, Request, Response } from "express";

function authenticate(request: Request, response: Response, next: NextFunction) {
    const user: User = {
        id: "2691d6f9-7660-4f81-afe2-19d20c84f545",
    };
    request.user = user;
    next();
}

export { authenticate };