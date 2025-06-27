import { useState } from 'react';
import axios from 'axios';

function GoalTime({ journalId, setGoalTime }) {
  const [inputTime, setInputTime] = useState('');

  const handleChange = (e) => {
    setInputTime(e.target.value);
  };

  const handleSubmit = () => {
    const goalTime = Number(inputTime);
    const now = new Date().toISOString(); // startTime, endTime 임시로 현재 시간 사용

    // 목표 시간 저장 API 연동
    axios.post(`https://fitlog-server-o04e.onrender.com/${journalId}`, {
      startTime: now,
      endTime: now,
      goalTime: goalTime,
    }).then((response) => {
      console.log('목표 시간 저장 성공:', response.data);
      setGoalTime(goalTime); // 부모 상태도 업데이트
    });
  };

  return (
    <div>
      <input
        type="number"
        placeholder="목표 시간 (초)"
        value={inputTime}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>목표 시간 저장</button>
    </div>
  );
}

export default GoalTime;