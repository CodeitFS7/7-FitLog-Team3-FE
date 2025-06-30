import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateJournalContent.module.css";

import { InputField } from "../InputField/index.jsx";
import { TextareaField } from "../TextareaField/index.jsx";
import { BackgroundSelector } from "../BackgroundSelector/index.jsx";
import { Message } from "../Message/index.jsx";

import {
  getJournalByJournalId,
  updateJournal,
} from "../../../../api/journals/journalsApi.js";
import { PATH } from "../../../../../utils/path.js";

const NICKNAME_MIN = 1;
const NICKNAME_MAX = 10;
const TITLE_MIN = 1;
const TITLE_MAX = 10;
const DESCRIPTION_MIN = 1;
const DESCRIPTION_MAX = 40;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 15;

function isValidPasswordCombination(password) {
  return /[A-Za-z]/.test(password) && /\d/.test(password);
}

function isRequiredString(value) {
  return typeof value === "string" && value.trim() !== "";
}

export const UpdateJournalContent = ({ journalId }) => {
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [background, setBackground] = useState(0);

  // 로딩, 에러, 성공 메시지 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 기존 저널 데이터 로딩 상태
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // 입력 필드별 개별 에러 상태
  const [nicknameError, setNicknameError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const navigate = useNavigate();

  // 컴포넌트 마운트 시 기존 저널 데이터 가져오기
  useEffect(() => {
    const fetchJournalData = async () => {
      if (!journalId) {
        setLoadingInitialData(false);
        setFetchError("저널 ID가 없습니다.");
        return;
      }
      setLoadingInitialData(true);
      setFetchError(null);
      try {
        const data = await getJournalByJournalId(journalId);
        if (data) {
          setNickname(data.nickname || "");
          setTitle(data.title || "");
          setDescription(data.description || "");
          setBackground(data.background !== undefined ? data.background : 0);
          // 비밀번호 필드는 채우지 않음 (보안 및 UX)
        } else {
          setFetchError("저널 정보를 찾을 수 없습니다.");
        }
      } catch (err) {
        setFetchError(
          err.message || "기존 저널 정보를 불러오는데 실패했습니다."
        );
      } finally {
        setLoadingInitialData(false);
      }
    };
    fetchJournalData();
  }, [journalId]);

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    setError("");
    if (!isRequiredString(value)) {
      setNicknameError("닉네임은 필수 항목입니다.");
    } else if (value.length < NICKNAME_MIN || value.length > NICKNAME_MAX) {
      setNicknameError(
        `닉네임은 ${NICKNAME_MIN}자 이상 ${NICKNAME_MAX}자 이하로 입력해 주세요.`
      );
    } else {
      setNicknameError("");
    }
  };
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setError("");
    if (!isRequiredString(value)) {
      setTitleError("운동일지 이름은 필수 항목입니다.");
    } else if (value.length < TITLE_MIN || value.length > TITLE_MAX) {
      setTitleError(
        `운동일지 이름은 ${TITLE_MIN}자 이상 ${TITLE_MAX}자 이하로 입력해 주세요.`
      );
    } else {
      setTitleError("");
    }
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    setError("");
    if (!isRequiredString(value)) {
      setDescriptionError("운동일지 소개는 필수 항목입니다.");
    } else if (
      value.length < DESCRIPTION_MIN ||
      value.length > DESCRIPTION_MAX
    ) {
      setDescriptionError(
        `운동일지 소개는 ${DESCRIPTION_MIN}자 이상 ${DESCRIPTION_MAX}자 이하로 입력해 주세요.`
      );
    } else {
      setDescriptionError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
    if (value.length > 0) {
      // 입력값이 있을 때만 유효성 검사
      if (value.length < PASSWORD_MIN || value.length > PASSWORD_MAX) {
        setPasswordError(
          `비밀번호는 ${PASSWORD_MIN}자 이상 ${PASSWORD_MAX}자 이하로 입력해 주세요.`
        );
      } else if (!isValidPasswordCombination(value)) {
        setPasswordError("비밀번호는 영문과 숫자를 모두 포함해야 합니다.");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setPasswordCheck(value);
    setError("");
    if (value.length > 0) {
      if (value.length < PASSWORD_MIN || value.length > PASSWORD_MAX) {
        setPasswordCheckError(
          `비밀번호는 ${PASSWORD_MIN}자 이상 ${PASSWORD_MAX}자 이하로 입력해 주세요.`
        );
      } else if (!isValidPasswordCombination(value)) {
        setPasswordCheckError("비밀번호는 영문과 숫자를 모두 포함해야 합니다.");
      } else {
        setPasswordCheckError("");
      }
    } else {
      setPasswordCheckError("");
    }
  };

  // 모든 폼 필드의 최종 유효성 검사
  const validateForm = () => {
    let isValid = true;
    setNicknameError("");
    setTitleError("");
    setDescriptionError("");
    setPasswordError("");
    setPasswordCheckError("");

    // 필수 필드 유효성 검사
    if (!isRequiredString(nickname)) {
      setNicknameError("닉네임은 필수 항목입니다.");
      isValid = false;
    } else if (
      nickname.length < NICKNAME_MIN ||
      nickname.length > NICKNAME_MAX
    ) {
      setNicknameError(
        `닉네임은 ${NICKNAME_MIN}자 이상 ${NICKNAME_MAX}자 이하로 입력해 주세요.`
      );
      isValid = false;
    }

    if (!isRequiredString(title)) {
      setTitleError("운동일지 이름은 필수 항목입니다.");
      isValid = false;
    } else if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
      setTitleError(
        `운동일지 이름은 ${TITLE_MIN}자 이상 ${TITLE_MAX}자 이하로 입력해 주세요.`
      );
      isValid = false;
    }

    if (!isRequiredString(description)) {
      setDescriptionError("운동일지 소개는 필수 항목입니다.");
      isValid = false;
    } else if (
      description.length < DESCRIPTION_MIN ||
      description.length > DESCRIPTION_MAX
    ) {
      setDescriptionError(
        `운동일지 소개는 ${DESCRIPTION_MIN}자 이상 ${DESCRIPTION_MAX}자 이하로 입력해 주세요.`
      );
      isValid = false;
    }

    // 비밀번호 필드: 입력값이 있는 경우에만 유효성 검사 및 일치 여부 확인
    if (password.length > 0 || passwordCheck.length > 0) {
      // 둘 중 하나라도 입력되면 모두 검사
      if (password !== passwordCheck) {
        setPasswordCheckError("비밀번호가 일치하지 않습니다.");
        isValid = false;
      }

      if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
        setPasswordError(
          `비밀번호는 ${PASSWORD_MIN}자 이상 ${PASSWORD_MAX}자 이하로 입력해 주세요.`
        );
        isValid = false;
      } else if (!isValidPasswordCombination(password)) {
        setPasswordError("비밀번호는 영문과 숫자를 모두 포함해야 합니다.");
        isValid = false;
      }

      if (
        passwordCheck.length < PASSWORD_MIN ||
        passwordCheck.length > PASSWORD_MAX
      ) {
        setPasswordCheckError(
          `비밀번호는 ${PASSWORD_MIN}자 이상 ${PASSWORD_MAX}자 이하로 입력해 주세요.`
        );
        isValid = false;
      } else if (!isValidPasswordCombination(passwordCheck)) {
        setPasswordCheckError("비밀번호는 영문과 숫자를 모두 포함해야 합니다.");
        isValid = false;
      }
    }

    if (background < 0 || background > 7) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("");

    const isFormValid = validateForm();
    if (!isFormValid) {
      setError("모든 항목을 올바르게 입력해 주세요.");
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        nickname,
        title,
        description,
        background,
        password: password.length > 0 ? password : undefined,
      };
      await updateJournal(journalId, updateData);

      setSuccess("운동일지가 성공적으로 수정되었습니다!");
      setTimeout(() => {
        navigate(PATH.journal.details(journalId));
      }, 1500);
    } catch (err) {
      setError(err.message || "운동일지 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingInitialData) {
    return (
      <div className={styles.formBox}>
        <div className={styles.title}>운동일지 수정</div>
        <p className={styles.loadingMessage}>기존 저널 정보 로딩 중...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className={styles.formBox}>
        <div className={styles.title}>운동일지 수정</div>
        <p className={styles.errorMessage}>오류 발생: {fetchError}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formBox}>
      <div className={styles.title}>운동일지 수정하기</div>
      <div className={styles.section}>
        <InputField
          label="사용자 닉네임"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onChange={handleNicknameChange}
          maxLength={NICKNAME_MAX + 1}
        />
        {nicknameError && (
          <div className={styles.errorMsg}>{nicknameError}</div>
        )}

        <InputField
          label="운동일지 이름"
          placeholder="운동일지 이름을 입력해주세요"
          value={title}
          onChange={handleTitleChange}
          maxLength={TITLE_MAX + 1}
        />
        {titleError && <div className={styles.errorMsg}>{titleError}</div>}

        <TextareaField
          label="운동일지 소개"
          placeholder="소개 멘트를 작성해 주세요"
          value={description}
          onChange={handleDescriptionChange}
          maxLength={DESCRIPTION_MAX + 1}
        />
        {descriptionError && (
          <div className={styles.errorMsg}>{descriptionError}</div>
        )}

        <BackgroundSelector selected={background} onSelect={setBackground} />
        <>
          <InputField
            label="비밀번호 (선택 사항)"
            type="password"
            placeholder="비밀번호를 변경하려면 입력해 주세요"
            value={password}
            onChange={handlePasswordChange}
            maxLength={PASSWORD_MAX + 1}
          />
          {passwordError && (
            <div className={styles.errorMsg}>{passwordError}</div>
          )}

          <InputField
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요"
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            maxLength={PASSWORD_MAX + 1}
          />
          {passwordCheckError && (
            <div className={styles.errorMsg}>{passwordCheckError}</div>
          )}
        </>

        <Message error={error} success={success} />
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "처리 중..." : "수정하기"}
        </button>
      </div>
    </form>
  );
};
