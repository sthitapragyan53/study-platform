import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ========== PUBLIC PAGES ========== */
import Home from "./pages/home/Home";
import GreetingPage2 from "./pages/greeting/GreetingPage2";

/* ========== AUTH ========== */
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";

/* ========== ONBOARDING ========== */
import ChooseBoard from "./pages/onboarding/ChooseBoard";

/* ========== MAIN APP ========== */
import Dashboard from "./pages/dashboard/Dashboard";
import Tests from "./pages/tests/Tests";

/* ========== STUDY FLOW (FINAL) ========== */
import SubjectResources from "./pages/subjects/SubjectResources"; // Chapter list
import ChapterDetails from "./pages/chapters/ChapterDetails";     // Unit content

//========== EXAM TRACKER ========== */
import ExamTracker from "./pages/examTracker/ExamTracker";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== LANDING ===== */}
        <Route path="/" element={<GreetingPage2 />} />
        <Route path="/home" element={<Home />} />

        {/* ===== AUTH ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />

        {/* ===== ONBOARDING ===== */}
        <Route path="/choose-board" element={<ChooseBoard />} />

        {/* ===== DASHBOARD ===== */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tests" element={<Tests />} />

        {/* ===== SUBJECT → CHAPTER LIST ===== */}
        <Route
          path="/class/:classLevel/:subject"
          element={<SubjectResources />}
        />

        {/* ===== CHAPTER → UNIT CONTENT ===== */}
        <Route
          path="/class/:classLevel/:subject/:chapterId"
          element={<ChapterDetails />}
        />

        {/* ===== EXAM TRACKER ===== */}
        {/* ✅ EXAM TRACKER */}
         <Route
          path="/exam-tracker"
          element={<ExamTracker />}
         />


        {/* ===== 404 FALLBACK (OPTIONAL BUT RECOMMENDED) ===== */}
        <Route
          path="*"
          element={
            <div style={{ padding: "100px", textAlign: "center" }}>
              <h1>404</h1>
              <p>Page not found</p>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
