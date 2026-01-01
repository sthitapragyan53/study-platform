import React from "react";
import "./AnalyticsChart.css";


export default function AnalyticsChart({ subjects, getProgress }) {
  return (
    <div className="analytics-chart">
      <h2>Progress Analytics</h2>

      <div className="chart-bars">
        {subjects.map((subject) => {
          const percent = getProgress(subject.slug);

          return (
            <div key={subject.slug} className="chart-item">
              <span className="chart-label">{subject.name}</span>

              <div className="chart-bar">
                <div
                  className="chart-fill"
                  style={{ height: `${percent}%` }}
                >
                  <span>{percent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
