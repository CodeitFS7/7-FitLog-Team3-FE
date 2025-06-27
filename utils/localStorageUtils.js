const RECENT_JOURNALS_KEY = "recentJournals";
const MAX_RECENT_JOURNALS = 3;

export const getRecentJournals = () => {
  try {
    const journals = localStorage.getItem(RECENT_JOURNALS_KEY);
    return journals ? JSON.parse(journals) : [];
  } catch (error) {
    console.error("Error getting recent journals from LocalStorage", error);
    return [];
  }
};

export const addRecentJournal = (newJournal) => {
  try {
    let recentJournals = getRecentJournals();

    // 이미 목록에 있는 일지라면 제거하고 맨 앞으로 이동
    recentJournals = recentJournals.filter(
      (journal) => journal.id !== newJournal.id
    );

    // 새 일지를 배열 맨 앞에 추가
    recentJournals.unshift(newJournal);

    // 최대 개수 유지
    if (recentJournals.length > MAX_RECENT_JOURNALS) {
      recentJournals = recentJournals.slice(0, MAX_RECENT_JOURNALS);
    }

    localStorage.setItem(RECENT_JOURNALS_KEY, JSON.stringify(recentJournals));
  } catch (error) {
    console.error("Error adding recent journal to LocalStorage", error);
  }
};
