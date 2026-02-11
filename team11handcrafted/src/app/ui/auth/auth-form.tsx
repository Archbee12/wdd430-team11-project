"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import styles from "./auth-form.module.css";
import "@/app/globals.css";
import { poppins } from "@/app/ui/fonts";

/* ===============================
   ZOD SCHEMAS
================================ */

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["buyer", "seller", "artisan"]),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

/* ===============================
   TYPES
================================ */

type AuthFormProps =
  | {
      type: "signup";
      action: (data: z.infer<typeof signupSchema>) => Promise<void>;
    }
  | {
      type: "signin";
      action: (data: z.infer<typeof loginSchema>) => Promise<void>;
    };

/* ===============================
   COMPONENT
================================ */

export default function AuthForm({ type, action }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      if (type === "signup") {
        const parsed = signupSchema.parse({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          role: formData.get("role"),
        });

        await action(parsed);
      } else {
        const parsed = loginSchema.parse({
          email: formData.get("email"),
          password: formData.get("password"),
        });

        await action(parsed);
      }

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <div className={styles.header}>
          <h1 className={`${styles.title} ${poppins.className}`}>
            {type === "signup" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className={styles.subtitle}>
            {type === "signup"
              ? "Join Handcrafted Haven today"
              : "Sign in to your account"}
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {type === "signup" && (
          <>
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input
                name="name"
                placeholder="Enter your name"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Role</label>
              <select name="role" className={styles.select}>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="artisan">Artisan</option>
              </select>
            </div>
          </>
        )}

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>
          {type === "signup" ? "Create Account" : "Sign In"}
        </button>

        <div className={styles.switch}>
          {type === "signup" ? (
            <>
              Already have an account? <a href="/auth/login">Sign In</a>
            </>
          ) : (
            <>
              Don’t have an account? <a href="/auth/signup">Sign Up</a>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
