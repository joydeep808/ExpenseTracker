

export type TRegistrationResponse = {
  statusCode:number
  message:string
  data:any
  success:boolean
}
export interface CustomError extends Error {
  cause?: {
    err?: {};
  };
}
