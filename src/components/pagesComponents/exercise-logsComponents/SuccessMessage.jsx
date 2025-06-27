import axios from 'axios';
import { useEffect } from 'react';

function SuccessMessage({ journalId, startTime, goalTime }) {

  useEffect(() => {
    const endTime = new Date().toISOString();

    axios.post(`https://fitlog-server-o04e.onrender.com/exercise-log/${journalId}`, {
      startTime: startTime,
      endTime: endTime,
      goalTime: goalTime,
    }).then((response) => {
      console.log('목표 시간 달성 운동 기록 저장 완료:', response.data);
    });
  }, [journalId, startTime, goalTime]);

  return (
    <div style={{ marginTop: "20px", fontWeight: "bold" }}>
      목표시간을 달성했습니다!
    </div>
  );
}

export default SuccessMessage;