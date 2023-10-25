import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // if other middleware is needed before using clerk, use the beforeAuth() function
  // Ensures that main page and redirect page doesn't require sign-in
  publicRoutes: ["/", "/(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
