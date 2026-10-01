import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`; Clerk's docs place
// `clerkMiddleware()` here. `clerkMiddleware()` treats every route as public by
// default (equivalent to the old `authMiddleware({ publicRoutes: ["/", "/(.*)"] })`),
// so auth is enforced where the data is read/mutated (tRPC `privateProcedure`,
// dashboard page) rather than here.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Clerk frontend API routes
    "/__clerk/(.*)",
  ],
};
