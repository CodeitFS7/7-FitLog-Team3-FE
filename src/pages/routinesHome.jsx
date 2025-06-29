// //루틴 페이지 (운동일지의 습관 기록표)
// // ㄴ>  습관 수정, 타이머 클릭 시 저널 비밀번호 필요
// // 수정 및 기록 시 비밀번호 확인을 전제로함
// //ㄴ> 습관 수정 시 루틴 상세 페이지로 이동
// //ㄴ> 운동기록(집중 클릭 시) 운동로그 페이지로 이동
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../components/pagesComponets/routinesComponents/routinesHeader/routineHeader.jsx";
// import RoutineTable from "../components/pagesComponets/routinesComponents/routinesTable/routineTable.jsx";
// import { RoutinesTable } from "../components/pagesComponents/routinesComponents/RoutinesTable/index.jsx";
// function RoutinesHome() {
//   const journalTitle = "운동 일지 이름";
//   const nickname = "닉네임";
//   const intro = "소개";
//   const weekDays = ["월", "화", "수", "목", "금", "토", "일"];
//   const [habitList, setHabitList] = useState([]);
//   const routines = [
//     {
//       id: "df148f96-96e0-41c5-99dd-ea9ab05c526e",
//       title: "바벨 스쿼트 5세트",
//       createdAt: "2025-06-28T05:54:47.836Z",
//       updatedAt: "2025-06-28T05:54:47.836Z",
//       journalId: "23ee39bc-8d23-4683-aa7f-eba6ed47a603",
//       weeklyCompletion: {
//         MON: false,
//         TUE: false,
//         WED: false,
//         THU: false,
//         FRI: false,
//         SAT: false,
//         SUN: false,
//       },
//     },
//     {
//       id: "aa5998c3-1fda-4cbf-8e57-75c7db04d821",
//       title: "데드리프트 3세트",
//       createdAt: "2025-06-28T05:54:58.673Z",
//       updatedAt: "2025-06-28T05:54:58.673Z",
//       journalId: "23ee39bc-8d23-4683-aa7f-eba6ed47a603",
//       weeklyCompletion: {
//         MON: false,
//         TUE: false,
//         WED: false,
//         THU: false,
//         FRI: false,
//         SAT: false,
//         SUN: false,
//       },
//     },
//     {
//       id: "059e7b76-2eb1-4e76-beef-f0fa9ae16d9d",
//       title: "오버헤드 프레스 4세트",
//       createdAt: "2025-06-28T05:55:07.804Z",
//       updatedAt: "2025-06-28T05:55:07.804Z",
//       journalId: "23ee39bc-8d23-4683-aa7f-eba6ed47a603",
//       weeklyCompletion: {
//         MON: false,
//         TUE: false,
//         WED: false,
//         THU: false,
//         FRI: false,
//         SAT: false,
//         SUN: false,
//       },
//     },
//     {
//       id: "367730ca-596f-4816-80f1-27554641d162",
//       title: "풀업 3세트 (최대 반복)",
//       createdAt: "2025-06-28T05:55:34.870Z",
//       updatedAt: "2025-06-28T05:55:34.870Z",
//       journalId: "23ee39bc-8d23-4683-aa7f-eba6ed47a603",
//       weeklyCompletion: {
//         MON: false,
//         TUE: false,
//         WED: false,
//         THU: false,
//         FRI: false,
//         SAT: false,
//         SUN: false,
//       },
//     },
//     {
//       id: "721a92aa-c522-441e-b734-b321841d7824",
//       title: "버피 테스트: 3세트 (10회)",
//       createdAt: "2025-06-28T05:55:52.574Z",
//       updatedAt: "2025-06-28T05:55:52.574Z",
//       journalId: "23ee39bc-8d23-4683-aa7f-eba6ed47a603",
//       weeklyCompletion: {
//         MON: false,
//         TUE: false,
//         WED: false,
//         THU: false,
//         FRI: false,
//         SAT: false,
//         SUN: false,
//       },
//     },
//   ];
//   // useEffect(() => {
//   //   fetch("https://fitlog-server-o04e.onrender.com/")
//   //     .then((res) => res.json())
//   //     .then((data) => setHabitList(data))
//   //     .catch((err) => console.error(err));
//   // }, []);

//   return (
//     <div>
//       <RoutinesTable routines={routines} />
//       <div>
//         <Link to="/RoutinesDetail">
//           <button>오늘의 습관</button>
//         </Link>
//         <Link to="/ExerciseLogs">
//           <button>오늘의 집중</button>
//         </Link>
//         <div>
//           <span>공유하기</span> |<span>수정하기</span> |
//           <span>스터디 삭제하기</span>
//         </div>
//       </div>
//       <div>
//         <Header title={journalTitle} nickname={nickname} intro={intro} />
//       </div>
//       <div className="weeklyReport">
//         <div className="weekly">
//           {weekDays.map((day) => (
//             <span key={day}>{day}</span>
//           ))}
//         </div>
//         <div className="routinesList">
//           {habitList.length === 0 ? (
//             <p>습관이 없습니다.</p>
//           ) : (
//             <>
//               <div className="weekly">
//                 {weekDays.map((day) => (
//                   <span key={day}>{day}</span>
//                 ))}
//               </div>
//               <RoutineTable habitList={habitList} weekDays={weekDays} />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RoutinesHome;
