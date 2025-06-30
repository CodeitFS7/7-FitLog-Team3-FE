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

export const deleteJournal = async (journalId) => {
  const url = new URL(`${BASE_URL}/${journalId}`);
  try {
    const res = await fetch(url.toString(), {
      method: "DELETE",
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP 상태 ${res.status}`);
    }
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      return data;
    } else if (res.status === 204) {
      return;
    } else {
      return await res.text();
    }
  } catch (err) {
    console.error("저널 삭제 실패 : ", err.message);
    throw err;
  }
};

export const verifyJournalPassword = async ({ journalId, password }) => {
  // 객체 형태로 journalId와 password를 받습니다.
  const url = new URL(`${BASE_URL}/${journalId}/verifyJournalPassword`);
  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP 상태 ${res.status}`);
    }

    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("비밀번호 검증 실패: ", err.message);
    throw err;
  }
};

export const createJournal = async (journalData) => {
  const url = BASE_URL; // /journals
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(journalData), // 요청 바디는 JSON 문자열로
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP 상태 ${res.status}`);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error("저널 생성 실패:", err);
    throw err;
  }
};

export const updateJournal = async (journalId, journalData) => {
  // journalId를 인자로 추가
  const url = `${BASE_URL}/${journalId}`;
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(journalData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP 상태 ${res.status}: 저널 업데이트 실패`
      );
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error("저널 업데이트 실패:", err);
    throw err;
  }
};
