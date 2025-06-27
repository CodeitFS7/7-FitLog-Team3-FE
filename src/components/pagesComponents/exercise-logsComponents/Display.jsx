import { useState } from 'react';
import axios from 'axios';

function GoalTime({ journalId, onSetGoalTime }) {
  const [inputTime, setInputTime] = useState('');

  const handleChange = (e) => {
    setInputTime(e.target.value);
  };

  const handleSaveGoalTime = () => {
    const goalTime = Number(inputTime);

  
    const now = new Date().toISOString();

    axios.post(`https://fitlog-server-o04e.onrender.com/${journalId}`, {
      startTime: now,
      endTime: now, 
      goalTime: goalTime,
    }).then((response) => {
      console.log('목표 시간 저장 성공:', response.data);
      onSetGoalTime(goalTime); // 부모 컴포넌트로 목표 시간 전달
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
      <button onClick={handleSaveGoalTime}>목표 시간 저장</button>
    </div>
  );
}

export default GoalTime;