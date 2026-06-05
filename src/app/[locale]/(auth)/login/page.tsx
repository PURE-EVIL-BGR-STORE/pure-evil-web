// This is the login page for the application, located at /login. It imports and renders the LoginView component from the auth feature.
import { LoginView } from "@/features/auth/login/views/login-view";

// This is the login page component that renders the LoginView.
export default function LoginPage() {
  return <LoginView />;
}
