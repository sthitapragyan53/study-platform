import "./subjectChapters.css";
import { useNavigate } from "react-router-dom";
import { chemistryChapters } from "../../data/syllabus/chemistry";

export default function ChemistryChapters() {
  const navigate = useNavigate();

  const board = localStorage.getItem("board") || "CBSE";
  const classLevel = localStorage.getItem("class") || "12";

  const progress =
    JSON.parse(localStorage.getItem("progress")) || {};

  const completedChapters =
    progress?.[board]?.[classLevel]?.chemistry || [];

  const toggleMark = (chapterId) => {
    const updated = completedChapters.includes(chapterId)
      ? completedChapters.filter((id) => id !== chapterId)
      : [...completedChapters, chapterId];

    const updatedProgress = {
      ...progress,
      [board]: {
        ...progress[board],
        [classLevel]: {
          ...progress?.[board]?.[classLevel],
          chemistry: updated,
        },
      },
    };

    localStorage.setItem(
      "progress",
      JSON.stringify(updatedProgress)
    );
  };

  return (
    <div className="chapters-wrapper">
      {/* HEADER */}
      <div className="chapters-header">
        <h1>Chemistry</h1>
        <span>Boards {chemistryChapters.year}</span>
      </div>

      <p className="chapters-subtitle">Showing Chapters</p>

      {/* CHAPTER LIST */}
      <div className="chapters-list">
        {chemistryChapters.chapters.map((chapter) => {
          const isDone =
            completedChapters.includes(chapter.id);

          return (
            <div
              key={chapter.id}
              className="chapter-card"
              onClick={() =>
                navigate(
                  `/class/${classLevel}/chemistry/${chapter.id}`
                )
              }
            >
              <div className="chapter-info">
                <span className="unit">
                  Unit {chapter.unit}
                </span>
                <h3>{chapter.title}</h3>
              </div>

              {/* MARK BUTTON */}
              <button
                className={`mark-btn ${
                  isDone ? "done" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMark(chapter.id);
                }}
              >
                {isDone ? "✓" : ""}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
