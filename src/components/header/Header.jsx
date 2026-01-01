import "./header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const toggleTheme = () => {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";

    const next =
      current === "light"
        ? "dark"
        : current === "dark"
        ? "amoled"
        : "light";

    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <header className="home-header glass">
      {/* LOGO */}
      <div className="header-logo">BrightNest</div>

      {/* NAVIGATION */}
      <nav className="header-nav">
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tests">Tests</Link>
        <Link to="/resources">Resources</Link>
      </nav>

      {/* ACTIONS */}
      <div className="header-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Change theme"
        >
          🌗
        </button>
      </div>
    </header>
  );
}
