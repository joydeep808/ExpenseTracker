
import { cookies } from "next/headers";
export function setCookies(name:string , value:string){
  cookies().set( {
    name ,
    value ,
    httpOnly: true,
    secure: true,
    path: "/",
}
)
}