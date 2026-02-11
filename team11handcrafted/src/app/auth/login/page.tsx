import AuthForm, { loginSchema } from "@/app/ui/auth/auth-form";
import { loginUser } from "@/app/auth";

export default function LoginPage() {
  async function loginAction(data: Parameters<typeof loginUser>[0]) {
    await fetch("/auth/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return <AuthForm type="signin" schema={loginSchema} action={loginAction} />;
}
