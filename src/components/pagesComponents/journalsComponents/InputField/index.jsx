// src/components/commonComponents/InputField/index.jsx
import React, { useState } from "react";
import styles from "./InputField.module.css"; // CSS Module 임포트 (로컬 환경 기준)
import EYE_ON_PATH from "../../../../assets/icons/eye_on.png";
import EYE_OFF_PATH from "../../../../assets/icons/eye_off.png";

// 입력 필드 컴포넌트 (비밀번호 가림처리 지원)
export const InputField = ({ label, type = "text", ...props }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={styles.inputGroup}>
      <div className={styles.label}>{label}</div>
      <div className={styles.inputWrapper}>
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
              src={show ? EYE_ON_PATH : EYE_OFF_PATH}
              alt={show ? "비밀번호 보이기" : "비밀번호 숨기기"}
              style={{ width: 24, height: 24 }}
            />
          </button>
        )}
      </div>
    </div>
  );
};
