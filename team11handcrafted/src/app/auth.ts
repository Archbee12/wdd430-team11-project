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
  role: z.enum(["buyer", "artisan"]),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/* ===============================
   SIGNUP
================================ */

export async function signupUser(data: z.infer<typeof signupSchema>) {
  try {
    const { name, email, password, role } = signupSchema.parse(data);

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email};
    `;

    if (existingUser.length > 0) {
      throw new Error("This email is already registered. Please sign in instead.");
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [user] = await sql<{ id: string }[]>`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (${name}, ${email}, ${password_hash}, ${role})
      RETURNING id;
    `;

    if (role === "artisan") {
      await sql`
        INSERT INTO artisans (id, name, bio, location, image_url)
        VALUES (
        ${user.id}, 
        ${name}, 
        'Bio not set yet', 
        'Unknown', 
        '/images/artisans/placeholder.jpg');
      `;
    }

    const token = crypto.randomUUID();

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    await sql`
      INSERT INTO sessions (user_id, token)
      VALUES (${user.id}, ${token});
    `;

    if (role === "artisan") {
      redirect(`/dashboard/artisans/${user.id}/edit`);
    } else {
      redirect("/dashboard");
    }
  } catch (error) {

    console.error("SIGNUP ERROR:", error);

    if (error instanceof z.ZodError) {
      throw error;
    }
    throw new Error("Unable to create account. Please try again.");
  }
}

/* ===============================
   LOGIN
================================ */

export async function loginUser(data: z.infer<typeof loginSchema>) {
  try {
    const { email, password } = loginSchema.parse(data);

    const [user] = await sql<{
      id: string;
      password_hash: string;
      role: string;
    }[]>`
      SELECT id, password_hash, role
      FROM users
      WHERE email = ${email};
    `;

    if (!user) {
      throw new Error("No account found with this email, register to continue.");
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      throw new Error("Incorrect password.");
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

    if (user.role === "admin") {
      redirect("/dashboard/admin");
    }

    return {
      success: true,
      role: user.role
    };

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    if (error instanceof Error) {

      if (error.message.includes("ETIMEDOUT")) {
        throw new Error("Database connection failed. Please try again.");
      }

      throw error;
    }

    throw new Error("Something went wrong. Please try again.");
  }
}

/* ===============================
   LOGOUT
================================ */

export async function logoutUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (token) {
    await sql`
      DELETE FROM sessions
      WHERE token = ${token};
    `;
  }

  cookieStore.delete("session");

  redirect("/");
}

