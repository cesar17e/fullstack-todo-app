import AuthForm from "../components/AuthForm";
import { Navigate } from "react-router-dom";

function Login({ token, setToken }) {
  // If already logged in, redirect to the dashboard
  if (token) return <Navigate to="/" replace />;

  return (
    <div>
      <AuthForm setToken={setToken} />
    </div>
  );
}

export default Login;
