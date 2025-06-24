import React, { useState, useEffect } from "react";
import "../pages/routinesDetail.css";
import RoutineModal from "../components/pagesComponets/routinesComponents/routineModal.jsx";
import { useParams } from "react-router-dom";

const RoutineDetail = () => {
  const { journalId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [nickname, setNickname] = useState("사용자");
  const [routines, setRoutines] = useState([]);

  // ⏰ 현재 시간 갱신
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "오후" : "오전";
      const displayHour = hours % 12 === 0 ? 12 : hours % 12;
      setCurrentTime(
        `${year}-${month}-${day} ${ampm} ${displayHour}:${minutes}`
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // 👤 닉네임 불러오기
  useEffect(() => {
    const fetchNickname = async () => {
      if (!journalId) return;
      try {
        const res = await fetch(
          `https://fitlog-server-o04e.onrender.com/journals/${journalId}`
        );
        const data = await res.json();
        setNickname(data.data?.nickname || "사용자");
      } catch (err) {
        console.error("닉네임 불러오기 실패:", err);
      }
    };
    fetchNickname();
  }, [journalId]);

  // 📋 루틴 목록 불러오기
  useEffect(() => {
    const fetchRoutines = async () => {
      if (!journalId) return;
      try {
        const res = await fetch(
          `https://fitlog-server-o04e.onrender.com/routines?journalId=${journalId}`
        );
        const data = await res.json();
        setRoutines(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("루틴 목록 불러오기 실패:", err);
      }
    };
    fetchRoutines();
  }, [journalId]);

  // 모달 제어
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="routine-wrapper">
      <div className="routine-inner">
        <header className="routine-header">
          <div className="routine-inner2">
            <h1 className="routine-title">
              <span className="routine-nickname">{nickname}</span>
              <span className="routine-label">의 운동일지</span>
            </h1>
            <div className="routine-header-btns">
              <button className="routine-btn1">
                오늘의 집중{" "}
                <img
                  src="/src/assets/icons/ic_arrow_right.svg"
                  alt="arrow"
                  className="arrow-icon"
                />
              </button>
              <button className="routine-btn2">
                홈{" "}
                <img
                  src="/src/assets/icons/ic_arrow_right.svg"
                  alt="arrow"
                  className="arrow-icon"
                />
              </button>
            </div>
          </div>
          <p className="routine-time">현재 시간 | {currentTime}</p>
        </header>

        <div className="routine-content">
          <div className="routine-box">
            <div className="routine-box-header">
              <h2 className="today-routine">오늘의 습관</h2>
              <span className="routine-edit" onClick={handleOpenModal}>
                목록 수정
              </span>
            </div>
            <div className="routine-list">
              {routines.length === 0 ? (
                <p className="empty-massage">
                  아직 습관이 없어요! 목록 수정을 눌러 습관을 생성해보세요
                </p>
              ) : (
                <ul>
                  {routines.map((routine) => (
                    <li key={routine.id} className="routine-item">
                      {routine.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RoutineModal
          onClose={handleCloseModal}
          routines={routines}
          journalId={journalId}
          setRoutines={setRoutines}
        />
      )}
    </div>
  );
};

export default RoutineDetail;