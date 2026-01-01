import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { unitLoader } from "../../data/unitLoader";
import { class12ChemistryIndex } from "../../data/syllabus/class12/chemistry";
import "./chapterDetails.css";

/* ================= PROGRESS HELPERS ================= */
const getProgressKey = (classLevel, subject) => `${classLevel}-${subject}`;

const getCompletedUnits = (classLevel, subject) => {
  const data = localStorage.getItem(getProgressKey(classLevel, subject));
  return data ? JSON.parse(data) : [];
};

const toggleCompletedUnit = (classLevel, subject, chapterId) => {
  const completed = getCompletedUnits(classLevel, subject);

  const updated = completed.includes(chapterId)
    ? completed.filter((id) => id !== chapterId)
    : [...completed, chapterId];

  localStorage.setItem(
    getProgressKey(classLevel, subject),
    JSON.stringify(updated)
  );

  return updated;
};

export default function ChapterDetails() {
  const { classLevel, subject, chapterId } = useParams();
  const navigate = useNavigate();

  const [unitData, setUnitData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const [completed, setCompleted] = useState(false);

  /* ================= FIND CHAPTER META ================= */
  const chapters = class12ChemistryIndex.chapters;

  const chapterMeta =
    classLevel === "12" && subject === "chemistry"
      ? chapters.find((ch) => ch.id === chapterId)
      : null;

  /* ================= PREV / NEXT ================= */
  const currentIndex = chapters.findIndex((ch) => ch.id === chapterId);

  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;

  const nextChapter =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  /* ================= LOAD UNIT ================= */
  useEffect(() => {
    if (!chapterMeta) {
      setUnitData(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    unitLoader["12"]
      .chemistry(chapterMeta.unit)
      .then((module) => {
        setUnitData(module.default);
        setLoading(false);
        setSelectedAnswers({});
        setSubmitted(false);
        setScore(null);
      })
      .catch(() => {
        setUnitData(null);
        setLoading(false);
      });
  }, [chapterId]);

  /* ================= LOAD COMPLETION ================= */
  useEffect(() => {
    const completedUnits = getCompletedUnits(classLevel, subject);
    setCompleted(completedUnits.includes(chapterId));
  }, [chapterId, classLevel, subject]);

  /* ================= SUBMIT HANDLER ================= */
  const handleSubmit = () => {
    let correct = 0;

    unitData.mcqs.forEach((mcq, index) => {
      if (selectedAnswers[index] === mcq.answer) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div style={{ padding: "100px" }}>
        <Header />
        <p>Loading unit...</p>
      </div>
    );
  }

  if (!unitData) {
    return (
      <div style={{ padding: "100px" }}>
        <Header />
        <p>Unit not found</p>
      </div>
    );
  }

  return (
    <div className="chapter-wrapper">
      <Header />

      {/* ================= HEADER ================= */}
      <div className="chapter-header">
        <h1>{unitData.title}</h1>
        <p>
          Class {classLevel} • {subject}
        </p>
      </div>

      {/* ================= SHORT NOTES ================= */}
      {unitData.shortNotes?.length > 0 && (
        <section className="notes-section glass">
          <h2>📘 Short Notes</h2>
          <ul>
            {unitData.shortNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ================= MCQS ================= */}
      {unitData.mcqs?.length > 0 && (
        <section className="mcq-section glass">
          <h2>📝 Practice MCQs</h2>

          {unitData.mcqs.map((mcq, index) => {
            const selected = selectedAnswers[index];

            return (
              <div className="mcq-card" key={index}>
                <p className="mcq-question">
                  {index + 1}. {mcq.question}
                </p>

                <div className="mcq-options">
                  {mcq.options.map((option) => (
                    <button
                      key={option}
                      className={`mcq-option
  ${!submitted && selected === option ? "selected" : ""}
  ${
    submitted &&
    (option === mcq.answer ? "correct" : option === selected ? "wrong" : "")
  }
`}
                      onClick={() =>
                        !submitted &&
                        setSelectedAnswers({
                          ...selectedAnswers,
                          [index]: option,
                        })
                      }
                      disabled={submitted}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {submitted && mcq.explanation && (
                  <div className="mcq-explanation">
                    <strong>Explanation:</strong> {mcq.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* ================= SUBMIT ================= */}
      <div style={{ marginTop: "25px", textAlign: "center" }}>
        {!submitted ? (
          <button
            className="submit-btn"
            disabled={
              Object.keys(selectedAnswers).length !== unitData.mcqs.length
            }
            onClick={handleSubmit}
          >
            Submit Answers
          </button>
        ) : (
          <p style={{ fontWeight: "600" }}>
            🎯 Score: {score} / {unitData.mcqs.length}
          </p>
        )}
      </div>

      {/* ================= MARK AS COMPLETED ================= */}
      <div style={{ marginTop: "25px", textAlign: "center" }}>
        <button
          className={`complete-btn ${completed ? "completed" : ""}`}
          onClick={() => {
            const updated = toggleCompletedUnit(classLevel, subject, chapterId);
            setCompleted(updated.includes(chapterId));
          }}
        >
          {completed ? "❌ Mark as Incomplete" : "✔ Mark as Completed"}
        </button>
      </div>

      {/* ================= PREV / NEXT ================= */}
      <div className="chapter-nav">
        {prevChapter && (
          <button
            className="nav-btn"
            onClick={() =>
              navigate(`/class/${classLevel}/${subject}/${prevChapter.id}`)
            }
          >
            ⬅ Prev: {prevChapter.title}
          </button>
        )}

        {nextChapter && (
          <button
            className="nav-btn"
            onClick={() =>
              navigate(`/class/${classLevel}/${subject}/${nextChapter.id}`)
            }
          >
            Next: {nextChapter.title} ➡
          </button>
        )}
      </div>
    </div>
  );
}
