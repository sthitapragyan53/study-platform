import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function CreateAccount() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // 👉 Later: add API call here (register user)

    // After successful account creation
    navigate("/login");
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
          <h1>Create an account</h1>
          <p className="subtitle">
            Access your notes, tests, and progress anytime.
          </p>

          {/* FORM */}
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" placeholder="Your name" required />

            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />

            <label>Password</label>
            <input type="password" placeholder="••••••••" required />

            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" required />

            {/* CONTINUE BUTTON */}
            <div className="cta-wrapper">
            <button className="btn login-btn" type="submit">
              Continue
            </button>
            </div>
          </form>

          <p className="bottom-text">
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "#6366f1" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
