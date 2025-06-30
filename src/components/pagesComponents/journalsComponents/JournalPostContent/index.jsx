// src/components/pagesComponents/journalsComponents/JournalPostContent/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 사용
import styles from "./JournalPostContent.module.css"; // JournalPostContent 전용 CSS Module

// 분리된 공통 폼 요소 컴포넌트들을 임포트합니다. (경로 확인 필요)
import { InputField } from "../InputField/index.jsx"; // InputField 경로 확인
import { TextareaField } from "../TextareaField/index.jsx"; // TextareaField 경로 확인
import { BackgroundSelector } from "../BackgroundSelector/index.jsx"; // BackgroundSelector 경로 확인
import { Message } from "../Message/index.jsx"; // Message 경로 확인

// 저널 생성 API 함수 (axios 사용)
import { createJournal } from "../../../../api/journals/journalsApi.js"; // API 임포트 경로 확인
import { PATH } from "../../../../../utils/path.js"; // PATH 유틸리티 임포트 경로 확인

// --- 백엔드와 동일한 유효성 검사 기준 상수화 ---
const NICKNAME_MIN = 1;
const NICKNAME_MAX = 10;
const TITLE_MIN = 1;
const TITLE_MAX = 10;
const DESCRIPTION_MIN = 1;
const DESCRIPTION_MAX = 40;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 15;

// 비밀번호 영문+숫자 조합 체크 함수
function isValidPasswordCombination(password) {
  return /[A-Za-z]/.test(password) && /\d/.test(password);
}

// 필수 항목(공백만 입력도 불가) 검사 함수
function isRequiredString(value) {
  return typeof value === "string" && value.trim() !== "";
}

// JournalPostContent 컴포넌트: 운동일지 생성 폼과 로직을 포함합니다.
export const JournalPostContent = () => {
  // 폼 입력 필드 상태 관리
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [background, setBackground] = useState(0); // 배경 선택 기본값 (0부터 시작)

  // 전역 로딩, 에러, 성공 메시지 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 입력 필드별 개별 에러 메시지 상태
  const [nicknameError, setNicknameError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const navigate = useNavigate();

  // 닉네임 입력 변경 및 유효성 검사
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    setError(""); // 입력 시 전역 에러 초기화 (UX 개선)
    if (!isRequiredString(value)) {
      setNicknameError("닉네임은 필수 항목입니다.");
    } else if (value.length < NICKNAME_MIN || value.length > NICKNAME_MAX) {
      setNicknameError(
        `닉네임은 ${NICKNAME_MIN}자 이상 ${NICKNAME_MAX}자 이하로 입력해 주세요.`
      );
    } else {
      setNicknameError(""); // 유효성 통과 시 에러 메시지 제거
    }
  };

  // 운동일지 이름 입력 변경 및 유효성 검사
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

  // 운동일지 소개 입력 변경 및 유효성 검사
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

  // 비밀번호 입력 변경 및 유효성 검사
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
    if (!isRequiredString(value)) {
      setPasswordError("비밀번호는 필수 항목입니다.");
    } else if (value.length < PASSWORD_MIN || value.length > PASSWORD_MAX) {
      setPasswordError(
        `비밀번호는 ${PASSWORD_MIN}자 이상 ${PASSWORD_MAX}자 이하로 입력해 주세요.`
      );
    } else if (!isValidPasswordCombination(value)) {
      setPasswordError("비밀번호는 영문과 숫자를 모두 포함해야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  // 비밀번호 확인 입력 변경 및 유효성 검사
  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setPasswordCheck(value);
    setError("");
    if (!isRequiredString(value)) {
      setPasswordCheckError("비밀번호 확인은 필수 항목입니다.");
    } else if (value.length < PASSWORD_MIN || value.length > PASSWORD_MAX) {
      setPasswordCheckError(
        `비밀번호는 ${PASSWORD_MIN}자 이상 ${PASSWORD_MAX}자 이하로 입력해 주세요.`
      );
    } else if (!isValidPasswordCombination(value)) {
      setPasswordCheckError("비밀번호는 영문과 숫자를 모두 포함해야 합니다.");
    } else {
      setPasswordCheckError("");
    }
  };

  // 폼 필드 초기화 함수
  const resetForm = () => {
    setNickname("");
    setTitle("");
    setDescription("");
    setPassword("");
    setPasswordCheck("");
    setBackground(0); // 배경 선택 기본값으로 초기화
    // 모든 에러 메시지 초기화
    setNicknameError("");
    setTitleError("");
    setDescriptionError("");
    setPasswordError("");
    setPasswordCheckError("");
    setError("");
    setSuccess("");
  };

  // 모든 폼 필드의 최종 유효성 검사
  const validateForm = () => {
    let isValid = true;
    // 모든 개별 에러 메시지 초기화
    setNicknameError("");
    setTitleError("");
    setDescriptionError("");
    setPasswordError("");
    setPasswordCheckError("");

    // 닉네임 유효성 검사
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

    // 운동일지 이름 유효성 검사
    if (!isRequiredString(title)) {
      setTitleError("운동일지 이름은 필수 항목입니다.");
      isValid = false;
    } else if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
      setTitleError(
        `운동일지 이름은 ${TITLE_MIN}자 이상 ${TITLE_MAX}자 이하로 입력해 주세요.`
      );
      isValid = false;
    }

    // 운동일지 소개 유효성 검사
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

    // 비밀번호 유효성 검사
    if (!isRequiredString(password)) {
      setPasswordError("비밀번호는 필수 항목입니다.");
      isValid = false;
    } else if (
      password.length < PASSWORD_MIN ||
      password.length > PASSWORD_MAX
    ) {
      setPasswordError(
        `비밀번호는 ${PASSWORD_MIN}자 이상 ${PASSWORD_MAX}자 이하로 입력해 주세요.`
      );
      isValid = false;
    } else if (!isValidPasswordCombination(password)) {
      setPasswordError("비밀번호는 영문과 숫자를 모두 포함해야 합니다.");
      isValid = false;
    }

    // 비밀번호 확인 유효성 검사
    if (!isRequiredString(passwordCheck)) {
      setPasswordCheckError("비밀번호 확인은 필수 항목입니다.");
      isValid = false;
    } else if (
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

    // 비밀번호 일치 여부 검사
    if (password !== passwordCheck) {
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }

    // 배경 선택 유효성 검사 (BackgroundSelector는 총 8개의 배경을 제공하므로 인덱스는 0-7)
    if (background < 0 || background > 7) {
      // 이 경우는 UI에서 선택 불가능하게 되어 있으므로, 사실상 이 검사는 대부분 통과할 것입니다.
      // 하지만 혹시 모를 상황을 대비합니다.
      isValid = false;
    }

    return isValid;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지
    if (loading) return; // 중복 제출 방지

    setError(""); // API 호출 전에 전역 에러/성공 메시지 초기화
    setSuccess("");

    // 클라이언트 측 유효성 검사 수행
    const isFormValid = validateForm();

    if (!isFormValid) {
      // validateForm 내부에서 이미 개별 필드 에러 메시지가 설정됨
      setError("모든 항목을 올바르게 입력해 주세요."); // 전체 폼 에러 메시지 표시
      return; // 유효성 검사 실패 시 함수 종료
    }

    setLoading(true); // 로딩 상태 시작

    try {
      // API 호출: Journal 생성 (createJournal 함수는 fetch 기반으로 통일됨)
      await createJournal({
        nickname,
        title,
        description,
        password,
        background,
      });
      setSuccess("운동일지가 성공적으로 생성되었습니다!");
      resetForm(); // 폼 초기화

      // 성공 메시지 표시 후 1.5초 뒤 메인 페이지로 이동
      setTimeout(() => {
        navigate(PATH.index());
      }, 1500);
    } catch (err) {
      // API 호출 실패 시 에러 처리
      // err.message에는 createJournal 함수에서 설정한 에러 메시지가 포함됩니다.
      setError(err.message || "운동일지 생성에 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 상태 해제 (성공/실패 여부와 관계없이)
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formBox}>
      <div className={styles.title}>운동일지 만들기</div> {/* 폼 제목 */}
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
        {/* 비밀번호 필드 (생성 모드에서는 항상 표시) */}
        <>
          <InputField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
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
        <Message error={error} success={success} />{" "}
        {/* 전역 에러/성공 메시지 */}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading} // 로딩 중 버튼 비활성화
        >
          {loading ? "등록 중..." : "만들기"}
        </button>
      </div>
    </form>
  );
};
