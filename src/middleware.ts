// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'
// import { auth } from '@/auth';
// import { getSession } from './sessionCheck/Session';
// export const config = {
//   matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
// };
// export async function middleware(request: NextRequest) {
//   const url = request.nextUrl
//   console.log(url)
  
//   console.log(token)
//     if(token && url.pathname.startsWith("/Sign-Up") ||  url.pathname.startsWith("/sign-in")|| url.pathname.startsWith("/verify/:*")){
//       return NextResponse.redirect(new URL('/dashboard', request.url))
//     }  
//   if (!token && url.pathname.startsWith("/dashboard/*") || url.pathname.startsWith("/logOut")) {
//     return NextResponse.rewrite(new URL('/sign-in', request.url))
//   }
  
// }


import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

 
export default NextAuth(authConfig).auth;
  
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.svg$|.*\\.png$).*)'],
};