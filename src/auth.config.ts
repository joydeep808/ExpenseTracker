
import type { NextAuthConfig } from 'next-auth';
export const authConfig = {
 trustHost: true, 
  pages: {
    signIn: '/sign-in',
    
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // if (!auth || !auth.user || new Date(auth.expires) < new Date()) return Response.redirect("/sign-in")
      const isLoggedIn = !!auth?.user;
      const userInfo = auth?.user
      const url = nextUrl
        if(url.pathname.startsWith("/admin")){
          if (!userInfo.role.includes("ADMIN")) {
            return Response.redirect("/admin/error")
          }
        }
          if(isLoggedIn ){
            if (url.pathname.startsWith("/Sign-Up") ||  url.pathname.startsWith("/sign-in")|| url.pathname.startsWith("/verify/:*")) {
             return Response.redirect(new URL('/dashboard', url)) 
            }
             return true
          }  
        if ( url.pathname.startsWith("/dashboard/*")||  url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/logOut") || url.pathname.startsWith("/private")) {
           Response.redirect(new URL('/sign-in', url))
          return false
        }
        return true
  },
},
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;