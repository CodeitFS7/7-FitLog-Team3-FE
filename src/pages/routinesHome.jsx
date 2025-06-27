//루틴 페이지 (운동일지의 습관 기록표)
// ㄴ>  습관 수정, 타이머 클릭 시 저널 비밀번호 필요
// 수정 및 기록 시 비밀번호 확인을 전제로함
//ㄴ> 습관 수정 시 루틴 상세 페이지로 이동
//ㄴ> 운동기록(집중 클릭 시) 운동로그 페이지로 이동
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/pagesComponets/routinesComponents/routinesHeader/routineHeader.jsx";
import RoutineTable from "../components/pagesComponets/routinesComponents/routinesTable/routineTable.jsx";

function RoutinesHome() {
  const journalTitle = "운동 일지 이름";
  const nickname = "닉네임";
  const intro = "소개";
  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];
  const [habitList, setHabitList] = useState([]);

  useEffect(() => {
    fetch("https://fitlog-server-o04e.onrender.com/")
      .then((res) => res.json())
      .then((data) => setHabitList(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div>
        <Link to="/RoutinesDetail">
          <button>오늘의 습관</button>
        </Link>
        <Link to="/ExerciseLogs">
          <button>오늘의 집중</button>
        </Link>
        <div>
          <span>공유하기</span> |<span>수정하기</span> |
          <span>스터디 삭제하기</span>
        </div>
      </div>
      <div>
        <Header title={journalTitle} nickname={nickname} intro={intro} />
      </div>
      <div className="weeklyReport">
        <div className="weekly">
          {weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="routinesList">
          {habitList.length === 0 ? (
            <p>습관이 없습니다.</p>
          ) : (
            <>
              <div className="weekly">
                {weekDays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <RoutineTable habitList={habitList} weekDays={weekDays} />
            </>
          )}
        </div>
      </div>
// ㄴ>  습관 수정, 타이머 클릭 시 저널 비밀번호 필요 
// 수정 및 기록 시 비밀번호 확인을 전제로함
//ㄴ> 습관 수정 시 루틴 상세 페이지로 이동 
//ㄴ> 운동기록(집중 클릭 시) 운동로그 페이지로 이동
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header from '../components/pagesComponets/routinesComponents/routinesHeader/routineHeader.jsx';
import RoutinesHome from './routinesHome.jsx';
import RoutineTable from "../components/pagesComponets/routinesComponents/routinesTable/routineTable.jsx";

function RoutinesHome() {
      const journalTitle = "운동 일지 이름";
      const nickname = "닉네임";
      const intro = "소개";
      const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
      const [habitList, setHabitList] = useState([]);

       useEffect(() => {
    fetch('https://fitlog-server-o04e.onrender.com/')
      .then(res => res.json())
      .then(data => setHabitList(data))
      .catch(err => console.error(err));
  }, []);


    return (
    <div>
      
      <div>
        <Link to="/RoutinesDetail"><button>오늘의 습관</button></Link>
        <Link to="/ExerciseLogs"><button>오늘의 집중</button></Link>
        <div> 
          <span>공유하기</span> | 
          <span>수정하기</span> | 
          <span>스터디 삭제하기</span>
        </div>
      </div>
      <div>
      <Header title={journalTitle} nickname={nickname} intro={intro} />
    </div>
      <div className='weeklyReport'>
        <div className='weekly'>
          {weekDays.map(day => <span key={day}>{day}</span>)}
        </div>
        <div className='routinesList'>
          {habitList.length === 0 ? (
            <p>습관이 없습니다.</p>
          ) : (
    <>
      <div className="weekly">
        {weekDays.map(day => <span key={day}>{day}</span>)}
      </div>
      <RoutineTable habitList={habitList} weekDays={weekDays} />
    </>
  )}
</div>
      </div>
    </div>
  );
}
    

export default RoutinesHome;
