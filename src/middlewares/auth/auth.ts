import { NextFunction, Request, Response } from "express";

function authenticate(request: Request, response: Response, next: NextFunction) {
    const user: User = {
        id: "d62ea177-8fef-44d5-8776-807a8399a8db", // User Id
    };
    request.user = user;
    next();
}

export { authenticate };