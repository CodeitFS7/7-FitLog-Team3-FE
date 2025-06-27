import { useEffect, useState } from 'react';
import axios from 'axios';

function GetPoint({ journalId }) {
  const [point, setPoint] = useState(0);

  useEffect(() => {
    if (journalId) {
      axios.get(`https://fitlog-server-o04e.onrender.com//${journalId}`)
        .then((response) => {
          setPoint(response.data.SumExercisePoint);
        });
    }
  }, [journalId]);

  return (
    <div>
      {point} point 득근
    </div>
  );
}

export default GetPoint;