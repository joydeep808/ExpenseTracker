

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


export  interface SessionUser{
  email:string , 
  name:string , 
  _id:string , 
  isVerifyed:boolean , 
  role:[string]  , 
  refreshToken:string , 
  expiresAt:number

}