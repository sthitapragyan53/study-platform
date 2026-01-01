import "./home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Calender from "../../components/calendar/Calender";

export default function Home() {
  const navigate = useNavigate();

  const [board, setBoard] = useState("");
  const [classLevel, setClassLevel] = useState("");

  useEffect(() => {
    const savedBoard = localStorage.getItem("board");
    const savedClass = localStorage.getItem("class");

    // ❌ if user directly opens /home without selecting
    if (!savedBoard || !savedClass) {
      navigate("/");
      return;
    }

    setBoard(savedBoard);
    setClassLevel(savedClass);
  }, [navigate]);

  const handleChangeBoard = () => {
  localStorage.removeItem("board");
  localStorage.removeItem("class");
  navigate("/");
};


  return (
    <div className="home-wrapper">
      <Header />

      <div className="home-glass">

        {/* LEFT CONTENT */}
        <div className="home-left">

          {/* 🔹 Board + Class Badge */}
          <div className="user-meta">
            🎓 {board} • Class {classLevel}
           <button className="change-btn" onClick={handleChangeBoard}>
             Change
           </button>
          </div>

          <span className="badge">🚀 Smart Study Platform</span>

          <h1>
            The smarter way to <br />
            <span>prepare for exams</span>
          </h1>

          <p>
            Track your syllabus, practice tests, and monitor progress —
            all in one place for Class {classLevel} students.
          </p>

          <div className="home-actions">
            <button
              className="primary-btn"
              onClick={() => navigate("/dashboard")}
            >
              Get Started
            </button>

            <button className="secondary-btn"
            onClick={() => navigate("/exam-tracker")}
            >Track your Exams</button>
              
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="home-right">
          <Calender />
        </div>

      </div>
    </div>
  );
}
