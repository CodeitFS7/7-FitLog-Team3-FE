//운동기록(타이머) 페이지
//루틴 상세 페이지 (생성, 수정)
import { Link } from 'react-router-dom';

function ExerciseLogs() {
    return (
    <div>
         <Link to="/ExerciseLogs">
        <button>오늘의 집중</button>
      </Link>

      <Link to="/RoutinesHome">
        <button>홈</button>
      </Link>
      
        <h1>운동기록(타이머) 페이지</h1>
      <h2>운동기록을해요</h2>
      

     

    </div>
  );
}
export default ExerciseLogs;
