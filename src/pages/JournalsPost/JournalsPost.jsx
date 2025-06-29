// 운동일지 생성 페이지

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./JournalsPost.module.css";
import icBgSelected from "../../assets/icons/ic_bg_selected.svg";
import { Header } from "../../components/commonComponents/Header";

// 배경 이미지 import
import img1 from "../../assets/images/backgroundJournal/background0.png";
import img2 from "../../assets/images/backgroundJournal/background1.png";
import img3 from "../../assets/images/backgroundJournal/background2.png";
import img4 from "../../assets/images/backgroundJournal/background3.png";

// 비밀번호 가림처리 아이콘 import
import eyeOn from "../../assets/icons/eye_on.png";
import eyeOff from "../../assets/icons/eye_on.png";

// --- 백엔드와 동일한 유효성 검사 기준 상수화 ---
const NICKNAME_MIN = 1;
const NICKNAME_MAX = 10;
const TITLE_MIN = 1;
const TITLE_MAX = 10;
const DESCRIPTION_MIN = 1;
const DESCRIPTION_MAX = 40;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 15;

// 배경 이미지 목록
const backgrounds = [
  { img: img1 },
  { img: img2 },
  { img: img3 },
  { img: img4 },
  { color: "#FCF4DD" },
  { color: "#DAEAF6" },
  { color: "#FCE1E4" },
  { color: "#DDEDEA" },
];

// 비밀번호 영문+숫자 조합 체크 함수
function isValidPasswordCombination(password) {
  return /[A-Za-z]/.test(password) && /\d/.test(password);
}

// 필수 항목(공백만 입력도 불가) 검사 함수
function isRequiredString(value) {
  return typeof value === "string" && value.trim() !== "";
}

// 입력 필드 컴포넌트 (비밀번호 가림처리 지원)
function InputField({ label, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={styles.inputGroup}>
      <div className={styles.label}>{label}</div>
      <input
        className={styles.input}
        type={isPassword ? (show ? "text" : "password") : type}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          tabIndex={-1}
          className={styles.eyeButton}
        >
          <img
            src={show ? eyeOn : eyeOff}
            alt={show ? "비밀번호 보이기" : "비밀번호 숨기기"}
            style={{ width: 24, height: 24 }}
          />
        </button>
      )}
    </div>
  );
}

// 텍스트 영역 컴포넌트
function TextareaField({ label, ...props }) {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.label}>{label}</div>
      <textarea className={styles.textarea} {...props} />
    </div>
  );
}

// 배경 선택 컴포넌트
function BackgroundSelector({ backgrounds, selected, onSelect }) {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.label}>배경을 선택해주세요</div>
      <div className={styles.backgroundGrid}>
        {backgrounds.map((bg, idx) => (
          <div
            key={idx}
            className={`${styles.backgroundItem} ${
              selected === idx ? styles.selected : ""
            }`}
            style={bg.color ? { background: bg.color } : {}}
            onClick={() => onSelect(idx)}
          >
            {bg.img && (
              <img
                src={bg.img}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            {selected === idx && (
              <img
                src={icBgSelected}
                alt="선택됨"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 40,
                  height: 40,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 메시지 컴포넌트
function Message({ error, success }) {
  if (error) return <div className={styles.errorMsg}>{error}</div>;
  if (success) return <div className={styles.successMsg}>{success}</div>;
  return null;
}

// 메인 컴포넌트
export default function JournalsPost() {
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [background, setBackground] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 입력값별 에러 상태
  const [nicknameError, setNicknameError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  // 입력값 변경 핸들러 (백엔드 기준 min/max 및 조합 체크 + 필수항목)
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

  const resetForm = () => {
    setNickname("");
    setTitle("");
    setDescription("");
    setPassword("");
    setPasswordCheck("");
    setBackground(0);
    setNicknameError("");
    setTitleError("");
    setDescriptionError("");
    setPasswordError("");
    setPasswordCheckError("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // 중복 제출 방지
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== passwordCheck) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    // 필수값, 길이, 조합, 일치, background 범위 모두 체크
    if (
      !isRequiredString(nickname) ||
      !isRequiredString(title) ||
      !isRequiredString(description) ||
      !isRequiredString(password) ||
      !isRequiredString(passwordCheck) ||
      nickname.length < NICKNAME_MIN ||
      nickname.length > NICKNAME_MAX ||
      title.length < TITLE_MIN ||
      title.length > TITLE_MAX ||
      description.length < DESCRIPTION_MIN ||
      description.length > DESCRIPTION_MAX ||
      password.length < PASSWORD_MIN ||
      password.length > PASSWORD_MAX ||
      !isValidPasswordCombination(password) ||
      passwordCheck.length < PASSWORD_MIN ||
      passwordCheck.length > PASSWORD_MAX ||
      !isValidPasswordCombination(passwordCheck) ||
      background < 0 ||
      background > 7
    ) {
      setError("모든 항목을 빠짐없이 입력해 주세요.");
      setLoading(false);
      return;
    }
    try {
      await axios.post("https://fitlog-server-o04e.onrender.com/journals", {
        nickname,
        title,
        description,
        password,
        background,
      });
      setSuccess("운동일지가 성공적으로 생성되었습니다!");
      resetForm();
      setTimeout(() => {
        navigate("/"); // 메인페이지로 이동
      }, 1500); // 1.5초 후 이동 (원하는 시간으로 조절)
    } catch (err) {
      setError(err.response?.data?.message || "생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formBox}>
          <div className={styles.title}>운동일지 만들기</div>
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
            <BackgroundSelector
              backgrounds={backgrounds}
              selected={background}
              onSelect={setBackground}
            />
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
            <Message error={error} success={success} />
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "등록 중..." : "만들기"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
