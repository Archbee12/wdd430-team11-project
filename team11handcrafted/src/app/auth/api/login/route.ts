// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const [user] = await sql<{ id: string; password_hash: string; name: string }[]>`
    SELECT * FROM users WHERE email = ${email};
  `;

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 400 });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return NextResponse.json({ error: "Invalid password" }, { status: 400 });

  const token = crypto.randomUUID();

  const res = NextResponse.json({ id: user.id, name: user.name });
  res.headers.set(
    "Set-Cookie",
    serialize("session", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 })
  );

  await sql`INSERT INTO sessions (user_id, token) VALUES (${user.id}, ${token});`;

  return res;
}
