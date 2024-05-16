import { NextResponse } from "next/server"



export class ApiResponse<T = any>{
  public statusCode:number 
  public message:string 
  public success:boolean
  public data?:T
  constructor(statusCode:number  = 200, message:string ,success:boolean, data?:T ){
    this.statusCode  = statusCode
    this.message  = message
    this.data = data 
    this.success = success
  }
  Nextresponse(){
    return NextResponse.json({
      statusCode:this.statusCode,
      message:this.message,
      success : this.success,
      data:this.data || null

    },{status:this.statusCode})
  }
  response(){
    return {
      statusCode:this.statusCode,
      message:this.message,
      success : this.success,
      data:this.data,

    }
  }
}


export async function UnauthorizedAccessResponse(){
  return new ApiResponse(401 , "Unauthorized accesss" , false).response()
}
export async function  InternalServerError() {
  return new ApiResponse(500 ,"We are facing some problems" ,false).response()
  
}