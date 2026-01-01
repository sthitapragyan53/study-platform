import "./examCountdown.css";

export default function ExamCountdown({ board, classLevel }) {
  /* ================= GET EXAM DATE ================= */
  const examDates = {
    CBSE: {
      "10": "2026-03-15",
      "12": "2026-03-10",
    },
    CHSE: {
      "12": "2026-03-20",
    },
  };

  const examDate =
    examDates?.[board]?.[classLevel] || null;

  /* ================= DAYS LEFT ================= */
  const getDaysLeft = () => {
    if (!examDate) return null;

    const today = new Date();
    const exam = new Date(examDate);
    const diff = exam - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysLeft();

  /* ================= UI ================= */
  if (!examDate) {
    return (
      <div className="exam-countdown glass">
        <p className="exam-missing">
          ⚠️ Exam date not set yet
        </p>
      </div>
    );
  }

  return (
    <div className="exam-countdown glass">
      <h3 className="exam-days">
        ⏳ {daysLeft} days left
      </h3>

      <p className="exam-date">
        Exam Date:{" "}
        <strong>
          {new Date(examDate).toDateString()}
        </strong>
      </p>
    </div>
  );
}
