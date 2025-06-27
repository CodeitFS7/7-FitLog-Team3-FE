import { useState } from "react";
import "./RoutinesDetail.css";

const dummyInitialRoutines = [
  "미라클모닝 6시 기상",
  "아침 공기 맡기",
  "React 스터디 책 1챕터 읽기",
  "스트레칭",
  "영양제 챙겨 먹기",
  "사이드 프로젝트",
  "물 2L 먹기",
];

export default function RoutinesDetail({ userName }) {
  const [routines, setRoutines] = useState(dummyInitialRoutines);
  const [activeIndexList, setActiveIndexList] = useState([]);

  const toggleRoutineActive = (index) => {
    setActiveIndexList((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <section className="routine-section">
      <div className="routine-wrapper">
        {/* 상단 헤더 */}
        <div className="routine-top-bar">
          <div>
            <h1 className="routine-username">
              <span className="highlight">{userName}</span>의 운동일지
            </h1>
          </div>
          <div className="routine-nav-buttons">
            <button className="routine-nav-button">오늘의 집중</button>
            <button className="routine-nav-button">홈</button>
          </div>
        </div>

        {/* 습관 목록 박스 */}
        <div className="routine-box">
          <div className="routine-header">
            <h2 className="routine-title">오늘의 습관</h2>
            <button className="edit-button" disabled>
              목록 수정
            </button>
          </div>

          {routines.length === 0 ? (
            <p className="routine-empty">
              아직 습관이 없어요
              <br />
              목록 수정을 눌러 습관을 생성해보세요
            </p>
          ) : (
            <ul className="routine-list">
              {routines.map((routine, idx) => (
                <li
                  key={idx}
                  className={`routine-item ${
                    activeIndexList.includes(idx)
                      ? "routine-item-active"
                      : "routine-item-default"
                  }`}
                  onClick={() => toggleRoutineActive(idx)}
                >
                  {routine}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
