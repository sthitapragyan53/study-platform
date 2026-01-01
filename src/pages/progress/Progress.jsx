import { useEffect, useState } from "react";
import "./progress.css";

/* ===== helpers ===== */
const getProgressKey = (classLevel, subject) =>
  `${classLevel}-${subject}`;

const getCompletedUnits = (classLevel, subject) => {
  const data = localStorage.getItem(
    getProgressKey(classLevel, subject)
  );
  return data ? JSON.parse(data) : [];
};

export default function Progress({
  classLevel,
  subject,
  totalChapters,
}) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const completed = getCompletedUnits(classLevel, subject);
    const value = Math.round(
      (completed.length / totalChapters) * 100
    );
    setPercent(value);
  }, [classLevel, subject, totalChapters]);

  return (
    <div className="progress-wrapper">
      <div className="progress-text">
        Progress: {percent}%
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
