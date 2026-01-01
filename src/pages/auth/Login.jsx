import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Later: real authentication logic

    // Check if board is already selected
    const board = localStorage.getItem("board");

    if (board) {
      navigate("/"); // go to Home
    } else {
      navigate("/choose-board"); // first-time onboarding
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* LEFT SIDE */}
        <div className="login-left">
          <h2>BrightNest</h2>
          <p className="tagline">
            Get access to your personal hub for clarity and productivity.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <h1>Welcome back</h1>
          <p className="subtitle">
            Login to continue your learning journey.
          </p>

          {/* FORM */}
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />

            <label>Password</label>
            <input type="password" placeholder="••••••••" required />

            <button className="btn login-btn" type="submit"  onClick={() => navigate("/choose-board")}>
              Login
            </button>
          </form>

          <p className="bottom-text">
            Don’t have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "#6366f1" }}
              onClick={() => navigate("/register")}
            >
              Create account
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
