// /api/auth/[slug].ts
import { getRouteHandlers } from "@propelauth/nextjs/server/app-router";
import { NextRequest } from "next/server";

const routeHandlers = getRouteHandlers({
  postLoginRedirectPathFn: (req: NextRequest) => {
    return "/welcome"; // Redirect path after login
  },
});

export const GET = routeHandlers.getRouteHandler;
export const POST = routeHandlers.postRouteHandler;

export async function generateStaticParams() {
  return [
    { slug: 'example' }, // Example slug for static generation
    // Add other slugs as needed
  ];
}
