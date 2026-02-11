// src/app/lib/session.ts
import { cookies } from "next/headers";
import { sql } from "./db";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) return null;

  const [session] = await sql<{ user_id: string }[]>`
    SELECT user_id FROM sessions WHERE token = ${sessionToken};
  `;
  if (!session) return null;

  const [user] = await sql<{ id: string; name: string }[]>`
    SELECT id, name FROM users WHERE id = ${session.user_id};
  `;

  return user ?? null;
}
