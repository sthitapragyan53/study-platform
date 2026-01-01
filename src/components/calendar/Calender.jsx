import "./calender.css";
import { useEffect, useState } from "react";

export default function Calendar() {
  const today = new Date();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const todayKey = today.toISOString().split("T")[0];

  /* ================= TASK STATE ================= */
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");

  /* ================= LOAD TASKS ================= */
  useEffect(() => {
    const stored = localStorage.getItem("calendarTasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  /* ================= SAVE TASKS ================= */
  useEffect(() => {
    localStorage.setItem("calendarTasks", JSON.stringify(tasks));
  }, [tasks]);

  /* ================= ADD TASK ================= */
  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks((prev) => ({
      ...prev,
      [todayKey]: [
        ...(prev[todayKey] || []),
        { text: newTask, done: false }
      ],
    }));

    setNewTask("");
  };

  /* ================= TOGGLE TASK ================= */
  const toggleTask = (index) => {
    setTasks((prev) => ({
      ...prev,
      [todayKey]: prev[todayKey].map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      ),
    }));
  };

  const todayTasks = tasks[todayKey] || [];
  const pendingCount = todayTasks.filter((t) => !t.done).length;

  /* ================= WEEK ================= */
  const startOfWeek = new Date(today);
  startOfWeek.setDate(currentDay - today.getDay());

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  return (
    <div className="calendar-card">
      <div className="calendar-top">
        <span className="calendar-pill">Weekly</span>
      </div>

      <div className="calendar-main">
        <h2>{monthNames[currentMonth]}</h2>
        <span className="calendar-date">{currentDay}</span>
      </div>

      <div className="calendar-days">
        {dayNames.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-numbers">
        {weekDates.map((date, index) => (
          <span
            key={index}
            className={date.getDate() === currentDay ? "active" : ""}
          >
            {date.getDate()}
          </span>
        ))}
      </div>

      {/* ================= TASK INPUT ================= */}
      <div className="calendar-task-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>+</button>
      </div>

      {/* ================= TASK LIST ================= */}
      <div className="calendar-tasks">
        {todayTasks.length === 0 ? (
          <p className="empty-task">No tasks today</p>
        ) : (
          todayTasks.map((task, index) => (
            <div
              key={index}
              className={`task-item ${task.done ? "done" : ""}`}
              onClick={() => toggleTask(index)}
            >
              {task.text}
            </div>
          ))
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="calendar-footer">
        <span>+ Add a task</span>
        <span>{pendingCount} pending</span>
      </div>
    </div>
  );
}
