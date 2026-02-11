"use server";

import { sql } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

/* ===============================
   SCHEMAS
================================ */

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["buyer", "seller", "artisan"]),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/* ===============================
   SIGNUP
================================ */

export async function signupUser(data: z.infer<typeof signupSchema>) {
  const { name, email, password, role } = signupSchema.parse(data);

  // Check if user already exists
  const existingUser = await sql`
    SELECT id FROM users WHERE email = ${email};
  `;

  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  const password_hash = await bcrypt.hash(password, 10);

  const [user] = await sql<{ id: string }[]>`
    INSERT INTO users (name, email, password_hash, role)
    VALUES (${name}, ${email}, ${password_hash}, ${role})
    RETURNING id;
  `;

  const token = crypto.randomUUID();

  (await cookies()).set("session", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  await sql`
    INSERT INTO sessions (user_id, token)
    VALUES (${user.id}, ${token});
  `;

  redirect("/dashboard");
}

/* ===============================
   LOGIN
================================ */

export async function loginUser(data: z.infer<typeof loginSchema>) {
  const { email, password } = loginSchema.parse(data);

  const [user] = await sql<{
    id: string;
    password_hash: string;
  }[]>`
    SELECT id, password_hash FROM users WHERE email = ${email};
  `;

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    throw new Error("Invalid password");
  }

  const token = crypto.randomUUID();

  (await cookies()).set("session", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  await sql`
    INSERT INTO sessions (user_id, token)
    VALUES (${user.id}, ${token});
  `;

  redirect("/dashboard");
}

/* ===============================
   LOGOUT
================================ */

export async function logoutUser() {
  (await cookies()).set("session", "", { maxAge: 0 });
  redirect("/");
}
