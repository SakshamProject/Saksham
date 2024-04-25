interface User {
  id: string;
}

interface Token {
  personId: string;
  userId: string;

}

declare namespace Express {
  export interface Request {
    user?: User;
    token?: Token;
  }
}
