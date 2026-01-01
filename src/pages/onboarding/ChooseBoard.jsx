import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./chooseBoard.css";

export default function ChooseBoard() {
  const navigate = useNavigate();

  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
    localStorage.setItem("board", board);
  };

  const handleClassSelect = (className) => {
    localStorage.setItem("class", className);

    // redirect after final selection
    navigate("/home");
  };

  return (
    <div className="board-wrapper">
      <div className="board-glass">

        {/* ================= STEP 1 ================= */}
        {!selectedBoard && (
          <>
            <h1>Choose Your Board</h1>
            <p className="subtitle">
              Select your education board to personalize your study experience.
            </p>

            <div className="board-options">
              <div className="board-card" onClick={() => handleBoardSelect("CBSE")}>
                <h3>CBSE</h3>
                <p>Central Board of Secondary Education</p>
              </div>

              <div className="board-card" onClick={() => handleBoardSelect("ICSE")}>
                <h3>ICSE</h3>
                <p>Indian Certificate of Secondary Education</p>
              </div>

              <div className="board-card" onClick={() => handleBoardSelect("CHSE")}>
                <h3>CHSE</h3>
                <p>Council of Higher Secondary Education</p>
              </div>

              <div className="board-card" onClick={() => handleBoardSelect("State")}>
                <h3>State Board</h3>
                <p>State-specific curriculum</p>
              </div>
            </div>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {selectedBoard && (
          <>
            <h1>Select Class</h1>
            <p className="subtitle">
              You selected <b>{selectedBoard}</b>. Now choose your class.
            </p>

            <div className="board-options">
              <div className="board-card" onClick={() => handleClassSelect("10")}>
                <h3>Class 10</h3>
                <p>Secondary Level</p>
              </div>

              <div className="board-card" onClick={() => handleClassSelect("11")}>
                <h3>Class 11</h3>
                <p>Higher Secondary (Science / Arts / Commerce)</p>
              </div>

              <div className="board-card" onClick={() => handleClassSelect("12")}>
                <h3>Class 12</h3>
                <p>Board Examination Year</p>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
