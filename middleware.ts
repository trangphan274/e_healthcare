import { clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { routeAccess} from "./lib/routes";


const matchers = Object.keys(routeAccess).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles :routeAccess[route],
}));
// const checkRoleAndRedirect = (
//   req:NextRequest,
//   role:string | undefined,
//   allowedRole: keyof typeof routeMatchers
// ): NextResponse | undefined =>{
//   if( routeMatchers[allowedRole](req)&& role !== allowedRole){
//     const url = new URL ("/",req.url);
//     console.log("Unauthorized access, redirecting to:",url);
//     return NextResponse.redirect(url);
//   }
// };
export default clerkMiddleware(async(auth,req)=>{
  const {userId,sessionClaims}= await auth ();
  const url = new URL(req.url);
  const role =
    userId && sessionClaims?.metadata.role
      ? sessionClaims.metadata.role
      : userId
      ?"patient"
      : "sign-in";
    const matchingRoute = matchers.find(({matcher})=>matcher(req));

    if (matchingRoute && !matchingRoute.allowedRoles.includes(role)){
      return NextResponse.redirect(new URL('/${role}',url.origin));
    }
    return NextResponse.next();
  });

  // console.log(role);
  // for (const {matcher,allowedRoles } of matchers){
  //   if(role && userId){
  //     if(matcher(req) && !allowedRoles.includes(role)){
  //       return NextResponse.redirect(new URL('/${role}',req.url));
  //     }
  //   }
  // }
  // const response =
  //   checkRoleAndRedirect(req, role, 'admin') ||
  //   checkRoleAndRedirect(req, role, 'doctor') ;
  //   // checkRoleAndRedirect(req, role, 'guest');
  //   if (response) return response;
// });
  
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
