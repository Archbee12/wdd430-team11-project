"use server";

import { sql } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function signupUser(data: { name: string; email: string; password: string; role: string }) {
  const password_hash = await bcrypt.hash(data.password, 10);

  const [user] = await sql<{ id: string }[]>`
    INSERT INTO users (name, email, password_hash, role)
    VALUES (${data.name}, ${data.email}, ${password_hash}, ${data.role})
    RETURNING id;
  `;

  const token = crypto.randomUUID();

  const response = NextResponse.json({ id: user.id, name: data.name });
  response.cookies.set("session", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 });

  await sql`INSERT INTO sessions (user_id, token) VALUES (${user.id}, ${token});`;

  return response;
}

export async function loginUser(data: { email: string; password: string }) {
  const [user] = await sql<{ id: string; password_hash: string; name: string }[]>`
    SELECT * FROM users WHERE email = ${data.email};
  `;

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(data.password, user.password_hash);
  if (!match) throw new Error("Invalid password");

  const token = crypto.randomUUID();
  const response = NextResponse.json({ id: user.id, name: user.name });
  response.cookies.set("session", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 });

  await sql`INSERT INTO sessions (user_id, token) VALUES (${user.id}, ${token});`;

  return response;
}

export async function logoutUser() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("session", "", { httpOnly: true, path: "/", maxAge: 0 });
}
