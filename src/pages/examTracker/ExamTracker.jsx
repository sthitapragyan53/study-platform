import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import CircularProgress from "../../components/circularAnimation/CircularProgress";
import ExamCountdown from "../../components/countdown/ExamCountdown";

import { subjectsData } from "../../data/subjectsData";

import { class12ChemistryIndex } from "../../data/syllabus/class12/chemistry";
import { class12PhysicsIndex } from "../../data/syllabus/class12/physics";
import { class12MathematicsIndex } from "../../data/syllabus/class12/mathematics";
import { class12BiologyIndex } from "../../data/syllabus/class12/biology";

import "./examTracker.css";

/* ================= EXAMS ================= */
const CLASS_12_EXAMS = [
  { id: "jee-main", name: "JEE Main", stream: ["PCM", "PCMB"] },
  { id: "jee-advanced", name: "JEE Advanced", stream: ["PCM", "PCMB"] },
  { id: "neet", name: "NEET", stream: ["PCB", "PCMB"] },
  { id: "nda", name: "NDA", stream: ["PCM", "PCMB"] },
  { id: "wbjee", name: "WBJEE", stream: ["PCM", "PCMB"] },
  { id: "ojee", name: "OJEE", stream: ["PCM", "PCMB"] },
  { id: "iat", name: "IAT (IISER)", stream: ["PCM", "PCMB"] },
  { id: "nest", name: "NEST (NISER)", stream: ["PCM", "PCMB"] },
];

/* ================= PROGRESS HELPERS ================= */
const getProgressKey = (classLevel, subject) =>
  `${classLevel}-${subject}`;

const getCompleted = (classLevel, subject) => {
  const data = localStorage.getItem(
    getProgressKey(classLevel, subject)
  );
  return data ? JSON.parse(data).length : 0;
};

const getTotalChapters = (classLevel, subject) => {
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

export default function ExamTracker() {
  const board = localStorage.getItem("board");
  const classLevel = localStorage.getItem("class");

  const [stream, setStream] = useState(
    localStorage.getItem("stream") || ""
  );

  const [selectedExams, setSelectedExams] = useState(
    JSON.parse(localStorage.getItem("selectedExams")) || []
  );

  /* ================= SAVE STATE ================= */
  useEffect(() => {
    localStorage.setItem("stream", stream);
  }, [stream]);

  useEffect(() => {
    localStorage.setItem(
      "selectedExams",
      JSON.stringify(selectedExams)
    );
  }, [selectedExams]);

  /* ================= FILTER EXAMS ================= */
  const availableExams = CLASS_12_EXAMS.filter((exam) =>
    stream ? exam.stream.includes(stream) : false
  );

  /* ================= OVERALL PROGRESS ================= */
  const subjects = subjectsData?.[board]?.[classLevel] || [];

  const totalChapters = subjects.reduce(
    (sum, s) => sum + getTotalChapters(classLevel, s.slug),
    0
  );

  const completedChapters = subjects.reduce(
    (sum, s) => sum + getCompleted(classLevel, s.slug),
    0
  );

  const overallPercent =
    totalChapters === 0
      ? 0
      : Math.round((completedChapters / totalChapters) * 100);

  return (
    <div className="exam-tracker-wrapper">
      <Header />

      <div className="exam-container">
        {/* ===== HEADER ===== */}
        <section className="glass exam-header">
          <h1>Exam Tracker • Class {classLevel}</h1>
          <p>Select your exam goals and track readiness</p>
        </section>

        {/* ===== STREAM ===== */}
        <section className="glass stream-select">
          <h2>Select Your Stream</h2>

          <div className="stream-row">
            {["PCM", "PCB", "PCMB"].map((s) => (
              <button
                key={s}
                className={`stream-btn ${
                  stream === s ? "active" : ""
                }`}
                onClick={() => setStream(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* ===== EXAM GRID ===== */}
        {stream && (
          <section className="glass exam-select">
            <h2>Select Exams</h2>

            <div className="exam-grid">
              {availableExams.map((exam) => {
                const isSelected =
                  selectedExams.includes(exam.id);

                return (
                  <div
                    key={exam.id}
                    className={`exam-card ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() =>
                      setSelectedExams((prev) =>
                        prev.includes(exam.id)
                          ? prev.filter((e) => e !== exam.id)
                          : [...prev, exam.id]
                      )
                    }
                  >
                    <div className="exam-checkbox">
                      {isSelected && "✓"}
                    </div>

                    <span className="exam-name">
                      {exam.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== COUNTDOWN ===== */}
        {selectedExams.length > 0 && (
          <section className="glass">
            <h2>Exam Countdown</h2>
            <ExamCountdown
              board={board}
              classLevel={classLevel}
            />
          </section>
        )}

        {/* ===== PROGRESS ===== */}
        <section className="glass overall-progress">
          <h2>Overall Syllabus Progress</h2>

          <CircularProgress
            percent={overallPercent}
            size={90}
          />

          <p>
            {completedChapters} / {totalChapters} chapters
            completed
          </p>
        </section>
      </div>
    </div>
  );
}
