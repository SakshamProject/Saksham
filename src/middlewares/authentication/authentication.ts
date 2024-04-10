
import { NextFunction, Request, Response } from "express";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "b3429edc-3f35-4e05-b0eb-dd258b3c2d35",
    };
    
    request.user = user;
    
    next();
  }

  export { authenticate };