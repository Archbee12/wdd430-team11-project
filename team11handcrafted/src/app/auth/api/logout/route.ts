import { NextResponse } from "next/server";
import { logoutUser } from "@/app/auth";

export async function GET() {
  const res = NextResponse.redirect(new URL("/", "http://localhost:3000"));
  await logoutUser(res);
  return res;
}
