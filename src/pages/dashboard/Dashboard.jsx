import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/header/Header";

import CircularProgress from "../../components/circularAnimation/CircularProgress";
import AnalyticsChart from "../../components/analyticsChart/AnalyticsChart";

import { subjectsData } from "../../data/subjectsData";
import { chaptersData } from "../../data/chaptersData";

import { class12ChemistryIndex } from "../../data/syllabus/class12/chemistry";
import { class12PhysicsIndex } from "../../data/syllabus/class12/physics";
import { class12MathematicsIndex } from "../../data/syllabus/class12/mathematics";
import { class12BiologyIndex } from "../../data/syllabus/class12/biology";


export default function Dashboard() {
  const navigate = useNavigate();

  const [board, setBoard] = useState("");
  const [classLevel, setClassLevel] = useState("");

  /* ================= LOAD USER SELECTION ================= */
  useEffect(() => {
    const savedBoard = localStorage.getItem("board");
    const savedClass = localStorage.getItem("class");

    if (!savedBoard || !savedClass) {
      navigate("/");
      return;
    }

    setBoard(savedBoard);
    setClassLevel(savedClass);
  }, [navigate]);

  /* ================= SUBJECT ICONS ================= */
  const subjectIcons = {
    math: "📐",
    maths: "📐",
    science: "🧪",
    physics: "⚡",
    chemistry: "⚗️",
    biology: "🧬",
    english: "📘",
    "social-science": "🌍",
  };

  /* ================= SUBJECT LIST ================= */
  const subjects = subjectsData?.[board]?.[classLevel] || [];

  /* ================= PROGRESS DATA ================= */
  /* ================= PROGRESS DATA (NEW SYSTEM) ================= */

  // Same key format used in ChapterDetails.jsx
  const getProgressKey = (classLevel, subject) => `${classLevel}-${subject}`;

  const getCompleted = (subject) => {
    const data = localStorage.getItem(getProgressKey(classLevel, subject));
    return data ? JSON.parse(data).length : 0;
  };


  /* ================= TOTAL CHAPTERS ================= */

  const getTotalChapters = (subject) => {
  if (classLevel !== "12") return 0;

  switch (subject) {
    case "chemistry":
      return class12ChemistryIndex.chapters.length;
    case "physics":
      return class12PhysicsIndex.chapters.length;
    case "mathematics":
      return class12MathematicsIndex.chapters.length;
    case "biology":
      return class12BiologyIndex.chapters.length;
    default:
      return 0;
  }
};


  const getProgress = (subject) => {
    const total = getTotalChapters(subject);
    if (total === 0) return 0;

    return Math.round((getCompleted(subject) / total) * 100);
  };

  const getCount = (subject) =>
    `${getCompleted(subject)} / ${getTotalChapters(subject)}`;

  /* ================= EXAM COUNTDOWN ================= */
  const examDates = {
    CBSE: {
      10: "2026-03-15",
      12: "2026-03-10",
    },
    CHSE: {
      12: "2026-03-20",
    },
  };

  const getDaysLeft = () => {
    const date = examDates?.[board]?.[classLevel];
    if (!date) return null;

    const today = new Date();
    const exam = new Date(date);
    const diff = exam - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  /* ================= UI ================= */
  return (
    <div className="dashboard-wrapper">
      <Header />

      {/* ================= OVERVIEW ================= */}
      <section className="dashboard-overview glass">
        <div>
          <h1>
            {board} • Class {classLevel} <span>Board Exam</span>
          </h1>
          <p className="overview-subtext">
            Track syllabus, monitor progress, and stay exam-ready
          </p>
        </div>

        <div className="countdown-card">
          {getDaysLeft() !== null ? (
            <>
              <strong>{getDaysLeft()}</strong>
              <span>days left</span>
            </>
          ) : (
            <>
              <strong>—</strong>
              <span>exam not set</span>
            </>
          )}
        </div>
      </section>

      {/* ================= MAIN GRID ================= */}
      <section className="dashboard-grid">
        {/* 📚 SYLLABUS */}
        <div className="syllabus-card glass">
          <h2>Syllabus Progress</h2>

          {subjects.length === 0 ? (
            <p>No subjects available.</p>
          ) : (
            subjects.map((subject) => (
              <div
                key={subject.slug}
                className="subject clickable"
                onClick={() => navigate(`/class/${classLevel}/${subject.slug}`)}
              >
                <span>
                  {subjectIcons[subject.slug] || "📘"} {subject.name}
                </span>

                <small>{getCount(subject.slug)}</small>

                <CircularProgress percent={getProgress(subject.slug)} />
              </div>
            ))
          )}
        </div>

        {/* 🚀 QUICK LEARNING ACTIONS */}
<div className="streak-card glass">
  <h2>Quick Learning</h2>
  <p className="streak-count">Boost your preparation</p>

  <div className="learning-actions">
    <button
      className="action-btn pyq"
      onClick={() => navigate("/pyq")}
    >
      📄 PYQs
      <span>Previous Year Questions</span>
    </button>

    <button
      className="action-btn roadmap"
      onClick={() => navigate("/roadmap")}
    >
      🧭 Roadmap
      <span>Step-by-step plan</span>
    </button>

    <button
      className="action-btn flashcard"
      onClick={() => navigate("/flashcards")}
    >
      🧠 Flashcards
      <span>Quick revision</span>
    </button>

    <button
      className="action-btn sample"
      onClick={() => navigate("/sample-papers")}
    >
      📝 Sample Papers
      <span>Exam practice</span>
    </button>

    <button
      className="action-btn tests"
      onClick={() => navigate("/tests")}                                                                     
    >
      📝 Tests
      <span>Exam practice</span>
    </button>

    <button
      className="action-btn shortnotes"
      onClick={() => navigate("/shortnotes")}
    >
      📝 Short Notes
      <span>Exam practice</span>
    </button>
  </div>
</div>

      </section>

      {/* ================= ANALYTICS ================= */}
      <section className="glass" style={{ marginTop: "40px" }}>
        <AnalyticsChart subjects={subjects} getProgress={getProgress} />
      </section>

      {/* ================= ACTION ================= */}
      <section className="dashboard-action">
        <button className="take-test-btn" onClick={() => navigate("/tests")}>
          Take a Test
        </button>
      </section>
    </div>
  );
}
