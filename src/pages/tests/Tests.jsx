import "./tests.css";
import Header from "../../components/header/Header";

export default function Tests() {
  return (
    <div className="tests-wrapper">
      <Header />

      {/* PAGE HEADER */}
      <div className="tests-header">
        <h1>
          Class 10 <span>Board exam</span>
        </h1>
        <h2>Test</h2>
      </div>

      {/* CHAPTER WISE TEST */}
      <section className="test-card glass">
        <h3>Chapter wise test</h3>
        <div className="subject-chips">
          <span className="chip">Math</span>
          <span className="chip">Science</span>
          <span className="chip">English</span>
          <span className="chip">Social Science</span>
        </div>
      </section>

      {/* MEDIUM TEST */}
      <section className="test-card glass">
        <h3>Medium test</h3>
        <div className="subject-chips">
          <span className="chip">Math</span>
          <span className="chip">Science</span>
          <span className="chip">English</span>
          <span className="chip">Social Science</span>
        </div>
      </section>

      {/* FULL TEST */}
      <section className="test-card glass center">
        <h3>Full test</h3>
        <p className="coming-soon">COMING SOON</p>
      </section>
    </div>
  );
}
