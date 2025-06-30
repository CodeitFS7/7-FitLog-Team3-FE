const BASE_URL = `https://fitlog-server-o04e.onrender.com/exerciseLogs`;

export const getExercisePointByJournalId = async (journalId) => {
  const url = new URL(`${BASE_URL}/${journalId}`);
  try {
    const res = await fetch(url.toString(), {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`HTTP 상태 ${res.status}`);
    }
    const data = await res.json();
    const { SumExercisePoint: exercisePoint } = data;
    return exercisePoint;
  } catch (err) {
    console.error("엑설사이즈 포인트 조회 실패 : ", err.message);
    throw err;
  }
};

export const updateExercisePointByJournalId = async (journalId, newPoints) => {
  const url = new URL(`${BASE_URL}/${journalId}`);
  try {
    const res = await fetch(url.toString(), {
      method: "PUT", // PUT or PATCH
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ SumExercisePoint: newPoints }),
    });
    if (!res.ok) throw new Error(`HTTP 상태 ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("엑설사이즈 포인트 업데이트 실패 : ", err.message);
    throw err;
  }
};