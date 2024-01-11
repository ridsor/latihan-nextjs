import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middleware/withAuth";
import { getToken } from "next-auth/jwt";

export async function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/dashboard",
  "/profile",
  "/login",
  "/register",
]);
