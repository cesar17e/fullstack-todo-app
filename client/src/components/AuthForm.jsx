import { useState } from "react";

function AuthForm({ setToken }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Basic frontend validation
    if (!email.includes("@") || password.length < 6) {
      return setError("Invalid email or password (password must be > 5 chars)");
    }

    // endpoint: register OR login
    const endpoint = isRegister ? "register" : "login";

    try {
      const res = await fetch(`/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed");
        return;
      }

      // SUCCESS: store token
      localStorage.setItem("token", data.token);
      setToken(data.token);  // triggers route redirect in App.jsx

    } catch (err) {
      setError("Something went wrong. Try again.");
      console.error(err);
    }
  }

  return (
    <form id="auth" onSubmit={handleSubmit}>
      <div>
        <h2 className="sign-up-text">{isRegister ? "Sign Up" : "Login"}</h2>
        <p>{isRegister ? "Create an account!" : "Welcome back!"}</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Submit</button>

      <hr />

      <div className="register-content">
        <p>{isRegister ? "Already have an account?" : "Don't have an account?"}</p>
        <button type="button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Sign in" : "Sign up"}
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
