import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./PasswordModalUI.module.css";
import eyeOn from "../../../assets/icons/eye_on.png";
import eyeOff from "../../../assets/icons/eye_off.png";

const PasswordModalUI = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  password,
  setPassword,
  isLoading,
  error,
  confirmButtonText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(password);
  };

  const inputClassName = error
    ? `${styles.input} ${styles.inputError}`
    : styles.input;
  const labelClassName = error
    ? `${styles.passwordLabel} ${styles.errorText}`
    : styles.passwordLabel;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
        >나가기</button>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalDescription}>{description}</p>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <label htmlFor="password-input" className={labelClassName}>
            비밀번호
          </label>
          <div className={styles.passwordInputWrapper}>
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              className={inputClassName}
              disabled={isLoading}
            />

            <span
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? eyeOn : eyeOff}
                alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                className={styles.passwordToggleIcon}
              />
            </span>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              disabled={isLoading || password.length === 0}
              className={styles.confirmButton}
            >
              {isLoading ? "확인 중..." : confirmButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

PasswordModalUI.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  confirmButtonText: PropTypes.string,
};

PasswordModalUI.defaultProps = {
  title: "운동일지 이름",
  description: "권한이 필요해요!",
  isLoading: false,
  error: "",
  confirmButtonText: "확인",
};

export default PasswordModalUI;
