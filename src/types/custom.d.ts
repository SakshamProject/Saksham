declare module 'is-iso-date'

interface User {
  id: string
}

declare namespace Express {
  export interface Request {
    user: User
    serviceMappingDefault: Boolean
  }
  export interface Response {
    user: User
  }
}
