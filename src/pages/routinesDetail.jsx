// src/pages/routinesDetail.jsx

import React, { useState, useEffect, useCallback } from "react";
import {
  getRoutinesByJournalId,
  createRoutine,
  deleteRoutine,
} from "../api/routines/routinesApi.js";
import "./routinesDetail.css";

export default function RoutinesDetail({ journalId }) {
  const [routines, setRoutines] = useState([]);
  const [newRoutine, setNewRoutine] = useState("");

  const fetchRoutines = useCallback(async () => {
    try {
      const data = await getRoutinesByJournalId(journalId);
      setRoutines(data.map((item) => ({ ...item, isDone: false }))); // 기본은 미완료
    } catch {
      alert("루틴 불러오기 실패");
    }
  }, [journalId]);

  const handleAddRoutine = async () => {
    const trimmed = newRoutine.trim();
    if (!trimmed) {
      alert("루틴 내용을 입력해주세요");
      return;
    }

    try {
      await createRoutine(journalId, { content: trimmed });
      setNewRoutine("");
      fetchRoutines();
    } catch {
      alert("루틴 추가 실패");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteRoutine(id);
      fetchRoutines();
    } catch {
      alert("삭제 실패");
    }
  };

  const toggleDone = (id) => {
    setRoutines((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  return (
    <div className="routine-wrapper">
      <div className="routine-card">
        <div className="routine-header">
          <h3>오늘의 습관</h3>
          <div className="routine-input-area">
            <input
              type="text"
              placeholder="새 루틴을 입력하세요"
              value={newRoutine}
              onChange={(e) => setNewRoutine(e.target.value)}
            />
            <button onClick={handleAddRoutine}>추가</button>
          </div>
        </div>

        <div className="routine-list">
          {routines.map((routine) => (
            <button
              key={routine.id}
              className={`routine-btn ${routine.isDone ? "done" : "not-done"}`}
              onClick={() => toggleDone(routine.id)}
            >
              {routine.content}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
