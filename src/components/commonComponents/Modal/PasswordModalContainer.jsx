import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import PasswordModalUI from "./PasswordModalUI.jsx";
import { verifyJournalPassword } from "../../../api/journals/journalsApi.js"; // ✅ 비밀번호 검증 함수

// actionType에 따른 텍스트 매핑 객체
const MODAL_TEXT_MAP = {
  view: {
    title: "운동일지 조회",
    description: "일지 내용을 조회하려면 비밀번호를 입력하세요.",
    confirmButtonText: "조회하기",
  },
  edit: {
    title: "운동일지 수정",
    description: "일지를 수정하려면 비밀번호를 입력하세요.",
    confirmButtonText: "수정하러 가기",
  },
  delete: {
    title: "운동일지 삭제",
    description: "일지를 삭제하려면 비밀번호를 입력하세요.",
    confirmButtonText: "운동일지 삭제하기",
  },
  navRoutines: {
    title: "운동 습관으로 이동",
    description: " 비밀번호를 입력하세요.",
    confirmButtonText: "오늘의 습관으로 가기",
  },
  navExerciseLog: {
    title: "운동 기록으로 이동",
    description: " 비밀번호를 입력하세요.",
    confirmButtonText: "오늘의 집중으로 가기",
  },
  default: {
    title: "비밀번호 확인",
    description: "권한이 필요해요!",
    confirmButtonText: "확인",
  },
};

const PasswordModalContainer = ({
  isOpen,
  onClose,
  onConfirmSuccess,
  actionType,
  journalId, // 이 journalId prop을 사용합니다.
}) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ 여기서 useMutation 선언 (hook 규칙 준수)
  const { mutateAsync: validatePassword } = useMutation({
    mutationFn: ({ password }) =>
      verifyJournalPassword({ journalId, password }), // journalId prop을 사용합니다.
  });

  // 모달이 열릴 때마다 비밀번호와 에러 메시지 초기화
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError("");
    }
  }, [isOpen]);

  const handleConfirm = useCallback(
    async (inputPassword) => {
      setIsLoading(true);
      setError("");
      try {
        const isValid = await validatePassword({ password: inputPassword });
        if (isValid) {
          setPassword("");
          await onConfirmSuccess(); // 성공 시 콜백 함수 호출
          onClose(); // 모달 닫기
        } else {
          setError("비밀번호가 일치하지 않습니다.");
        }
      } catch (err) {
        console.error("비밀번호 확인 중 오류 발생:", err);
        setError("오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    },
    [validatePassword, onConfirmSuccess, onClose]
  );

  // actionType에 따라 동적으로 텍스트 가져오기
  const currentText = MODAL_TEXT_MAP[actionType] || MODAL_TEXT_MAP["default"];

  return (
    <PasswordModalUI
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={currentText.title}
      description={currentText.description}
      confirmButtonText={currentText.confirmButtonText}
      password={password}
      setPassword={setPassword}
      isLoading={isLoading}
      error={error}
    />
  );
};

PasswordModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmSuccess: PropTypes.func.isRequired,
  journalId: PropTypes.string.isRequired, // journalId는 필수 prop입니다.
  actionType: PropTypes.oneOf([
    "view",
    "edit",
    "delete",
    "navExerciseLog",
    "navRoutines",
  ]).isRequired,
};

export default PasswordModalContainer;
