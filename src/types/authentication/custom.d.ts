interface User {
  id: string;
}

interface Token {
  personId: string;
  userId: string;
  superAdminId: string;
  serviceMappingAccess: Boolean;
  userSevaKendraId: string;
  divyangDetailsAccess: Boolean;
}

declare namespace Express {
  export interface Request {
    user?: User;
    token?: Token;
  }
}
