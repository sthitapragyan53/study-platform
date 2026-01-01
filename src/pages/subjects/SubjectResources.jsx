import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./subjectResources.css";

/* ================= CLASS 12 DATA ================= */
import { class12PhysicsIndex } 
from "../../data/syllabus/class12/physics";

import { class12ChemistryIndex } 
from "../../data/syllabus/class12/chemistry";

import { class12MathematicsIndex } 
from "../../data/syllabus/class12/mathematics"; 

import { class12BiologyIndex } 
from "../../data/syllabus/class12/biology";

/* ================= CLASS 11 DATA ================= */
import { class11BiologyIndex } 
from "../../data/syllabus/class11/biology";

import { class11ChemistryIndex } 
from "../../data/syllabus/class11/chemistry";

import { class11MathematicsIndex } 
from "../../data/syllabus/class11/mathematics";


import { class11PhysicsIndex } 
from "../../data/syllabus/class11/physics";
/* ================= SYLLABUS MAP ================= */
const syllabusMap = {
  "12": {
    chemistry: class12ChemistryIndex,
    physics: class12PhysicsIndex,
    mathematics: class12MathematicsIndex,
    biology: class12BiologyIndex,
  },

  "11": {
    biology: class11BiologyIndex,
    // later add
    chemistry: class11ChemistryIndex,
    physics: class11PhysicsIndex,
    mathematics: class11MathematicsIndex,
  },
};

export default function SubjectResources() {
  const navigate = useNavigate();
  const { classLevel, subject } = useParams();

  // ✅ ONE LINE DATA SELECTION
  const subjectData =
    syllabusMap?.[classLevel]?.[subject] || null;

  /* ================= SAFETY CHECK ================= */
  if (!subjectData) {
    return (
      <div style={{ padding: "100px" }}>
        <Header />
        <p>
          No chapters found for <b>{subject}</b> (Class {classLevel})
        </p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="subject-wrapper">
      <Header />

      {/* HEADER */}
      <div className="subject-header">
        <h1>{subjectData.subject}</h1>
        <p>Class {classLevel} • {subjectData.board}</p>
      </div>

      {/* CHAPTER LIST */}
      <div className="chapter-grid">
        {subjectData.chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="chapter-card"
            onClick={() =>
              navigate(
                `/class/${classLevel}/${subject.toLowerCase()}/${chapter.id}`
              )
            }
          >
            <strong>Unit {chapter.unit}</strong>
            <span>{chapter.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
