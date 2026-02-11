import AuthForm from "@/app/ui/auth/auth-form";
import { signupUser } from "@/app/auth";

export default function SignupPage() {
  return (
    <AuthForm
      type="signup"

      action={signupUser}
    />
  );
}
