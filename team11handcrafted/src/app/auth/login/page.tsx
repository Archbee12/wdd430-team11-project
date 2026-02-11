import AuthForm from "@/app/ui/auth/auth-form";
import { loginUser } from "@/app/auth";

export default function LoginPage() {
  return (
    <AuthForm
      type="signin"
      action={loginUser}
    />
  );
}
