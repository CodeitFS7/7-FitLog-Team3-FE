const BASE_URL = `https://fitlog-server-o04e.onrender.com/journals`;

export const getJournalsList = async (params = {}) => {
  const { page = 1, pageSize = 6, orderBy = "newest", keyword = "" } = params;

  const url = new URL(BASE_URL);
  url.searchParams.append("page", page);
  url.searchParams.append("pageSize", pageSize);
  url.searchParams.append("orderBy", orderBy);
  if (keyword) {
    url.searchParams.append("keyword", keyword);
  }
  try {
    const res = await fetch(url.toString(), {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`HTTP 상태 ${res.status}`);
    }

    const data = await res.json();
    // data 객체는 journals, totalCount 프로퍼티
    return data;
  } catch (err) {
    console.error("저널 조회 실패 : ", err.message);
    throw err;
  }
};

export const getJournalByJournalId = async (journalId) => {
  const url = new URL(`${BASE_URL}/${journalId}`);
  try {
    const res = await fetch(url.toString(), {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`HTTP 상태 ${res.status}`);
    }
    const data = await res.json();
    const { data: journal } = data;
    return journal;
  } catch (err) {
    console.error("저널 조회 실패 : ", err.message);
    throw err;
  }
};

export const postEmojiByJournalId = async (journalId, emojiType) => {
  const url = new URL(`${BASE_URL}/${journalId}/emojis`);
  try {
    const res = await fetch(url.toString(), {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emojiType: emojiType }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP 상태 ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("이모지 등록 실패 : ", err.message);
    throw err;
  }
};
