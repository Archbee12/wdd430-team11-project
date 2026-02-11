"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// Signup validation
export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["buyer", "seller", "artisan"]),
});

// Login validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type AuthFormProps<T> = {
  type: "signup" | "signin";
  schema: z.ZodType<T>;
  action: (data: T) => Promise<void>;
};

export default function AuthForm<T>({ type, schema, action }: AuthFormProps<T>) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller" | "artisan">("buyer");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const rawData = type === "signup"
        ? { name, email, password, role }
        : { email, password };

      const data = schema.parse(rawData); // Validate input
      await action(data);
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid input";
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 max-w-md mx-auto mt-10 border rounded shadow">
      <h1 className="text-xl font-bold">{type === "signup" ? "Sign Up" : "Sign In"}</h1>
      {error && <p className="text-red-500">{error}</p>}

      {type === "signup" && (
        <>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
          <select value={role} onChange={(e) => setRole(e.target.value as "buyer" | "seller" | "artisan")} className="border p-2 rounded">
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="artisan">Artisan</option>
          </select>
        </>
      )}

      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        {type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
}
