import AuthForm, { signupSchema } from "@/app/ui/auth/auth-form";
import { signupUser } from "@/app/auth";

export default function SignupPage() {
  async function signupAction(data: Parameters<typeof signupUser>[0]) {
    await fetch("/auth/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return <AuthForm type="signup" schema={signupSchema} action={signupAction} />;
}
