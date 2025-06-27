  import { useEffect } from 'react';
  import axios from 'axios';
  
  function Pause({ journalId, startTime, goalTime, setShowToast }) {
  
    useEffect(() => {
      const endTime = new Date().toISOString();
  
      // 일시정지 시 백엔드에 운동 기록 저장
      axios.post(`https://fitlog-server-o04e.onrender.com/${journalId}`, {
        startTime: startTime,
        endTime: endTime,
        goalTime: goalTime,
      }).then((response) => {
        console.log('일시정지 운동 기록 저장 성공:', response.data);
      });
  
      // 2초 후 토스트 자동으로 사라지게
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [journalId, startTime, goalTime, setShowToast]);
  
    return (
      <div style={{ position: "fixed", bottom: "30px", backgroundColor: "black", color: "white", padding: "10px" }}>
        운동이 일시정지 되었습니다
      </div>
    );
  }
  
  export default Pause;