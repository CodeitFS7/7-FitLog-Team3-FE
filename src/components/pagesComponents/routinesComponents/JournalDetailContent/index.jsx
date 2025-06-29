import { RoutinesTable } from "../RoutinesTable/index.jsx";
import { JournalEmojiManagement } from "../../routinesComponents/JournalEmojiManagement/index.jsx";
import { PointDisplay } from "../../journalsComponents/PointDisplay/index.jsx";
import { getJournalByJournalId } from "../../../../api/journals/journalsApi.js";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JournalDetailContent.module.css";
import { getExercisePointByJournalId } from "../../../../api/exerciseLogs/exerciseLogsApi.js";
import { LinkButton } from "../../../commonComponents/LinkButton/index.jsx";
import { PATH } from "../../../../../utils/path.js";
import { deleteJournal } from "../../../../api/journals/journalsApi.js";
import PasswordModalContainer from "../../../commonComponents/Modal/PasswordModalContainer.jsx";
// import verifyJournalPassword from "../../../commonComponents/Modal/PasswordModalContainer.jsx"; // ❌ 이 줄을 삭제합니다.
import arrowIcon from "../../../../assets/icons/ic_arrow_right.svg";
export const JournalDetailContent = ({ journalId }) => {
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalExercisePoint, setTotalExercisePoint] = useState(0);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [actionToPerform, setActionToPerform] = useState(null);
  const [targetPath, setTargetPath] = useState(null);

  const navigate = useNavigate();

  const fetchJournalData = useCallback(async () => {
    if (!journalId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await getJournalByJournalId(journalId);
      setJournal(response);
      const sumPoint = await getExercisePointByJournalId(journalId);
      setTotalExercisePoint(sumPoint);
    } catch (err) {
      console.error("저널 상세 정보 가져오기 실패:", err);
      setError("저널 상세 정보를 불러오는데 실패했습니다.");
      setJournal(null);
      setTotalExercisePoint(0);
    } finally {
      setLoading(false);
    }
  }, [journalId]);

  useEffect(() => {
    fetchJournalData();
  }, [fetchJournalData]);

  const handleProtectedActionClick = useCallback((actionType, path = null) => {
    console.log("버튼 클릭됨:", actionType, "path:", path); // 이 줄을 추가
    setActionToPerform(actionType);
    setTargetPath(path);
    setShowPasswordModal(true);
  }, []);

  const handleShareClick = useCallback(() => {
    alert("공유하기 기능은 나중에 구현됩니다.");
  }, []);

  const handleVerificationSuccess = useCallback(async () => {
    setShowPasswordModal(false);
    setError(null);

    try {
      if (actionToPerform === "edit") {
        navigate(PATH.journal.edit(journalId));
      } else if (actionToPerform === "delete") {
        const confirmDelete = window.confirm(
          "정말로 이 운동일지를 삭제하시겠습니까?"
        );
        if (confirmDelete) {
          await deleteJournal(journalId);
          alert("운동일지가 성공적으로 삭제되었습니다.");
          navigate(PATH.index());
        }
      } else if (actionToPerform === "navRoutines" && targetPath) {
        navigate(targetPath);
      } else if (actionToPerform === "navExerciseLog" && targetPath) {
        navigate(targetPath);
      }
    } catch (err) {
      console.error("보호된 액션 실패:", err);
      setError(
        err.response?.data?.message || "액션 수행 중 오류가 발생했습니다."
      );
    } finally {
      setActionToPerform(null);
      setTargetPath(null);
    }
  }, [actionToPerform, targetPath, journalId, navigate]);

  const handleModalClose = useCallback(() => {
    setShowPasswordModal(false);
    setActionToPerform(null);
    setTargetPath(null);
    setError(null);
  }, []);

  if (loading) return <p>저널 정보 로딩 중...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;
  if (!journal) return <p>저널 정보를 찾을 수 없습니다.</p>;

  const { title, nickname, description, emoji, routinePoint } = journal;
  const stampEmoji = "🎯";
  const muscleEmoji = "💪";

  return (
    <section className={styles.detailPageContainer}>
      <div className={styles.journalContent}>
        <div className={styles.journalInfo}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.nicknamePoint}>
            <p className={styles.nickname}>
              <span className={styles.nicknamespan}>
                {nickname}님의 운동일지
              </span>
            </p>
            <PointDisplay
              className={styles.routinePoint}
              emoji={stampEmoji}
              value={routinePoint}
              unit="개"
              mode="light"
            />
            <PointDisplay
              className={styles.exercisePoint}
              emoji={muscleEmoji}
              value={totalExercisePoint}
              unit="p 득근"
              mode="light"
            />
          </div>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.actionButtonContainer}>
          <div className={styles.utilityLinks}>
            <span className={styles.utilityLink} onClick={handleShareClick}>
              공유하기
            </span>
            <span className={styles.utilitySeparator}> | </span>
            <span
              className={styles.utilityLink}
              onClick={() => handleProtectedActionClick("edit")}
            >
              수정하기
            </span>
            <span className={styles.utilitySeparator}> | </span>
            <span
              className={styles.utilityLinkdelete}
              onClick={() => handleProtectedActionClick("delete")}
            >
              스터디 삭제하기
            </span>
          </div>

          <div className={styles.actionLinkButton}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={() =>
                handleProtectedActionClick(
                  "navRoutines",
                  PATH.journal.todayRoutines(journalId)
                )
              }
            >
              오늘의 루틴
              <img
                src={arrowIcon}
                alt="오른쪽 화살표"
                className={styles.arrowIcon}
              />
            </button>

            <button
              type="button"
              className={styles.actionButton}
              onClick={() =>
                handleProtectedActionClick(
                  "navExerciseLog",
                  PATH.journal.exerciseLogs(journalId)
                )
              }
            >
              오늘의 운동
              <img
                src={arrowIcon}
                alt="오른쪽 화살표"
                className={styles.arrowIcon}
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <RoutinesTable journalId={journalId} />
      </div>

      <div className={styles.emojiSection}>
        <JournalEmojiManagement
          emoji={emoji}
          journalId={journalId}
          onEmojiDataUpdated={fetchJournalData}
        />
      </div>

      {showPasswordModal && (
        <PasswordModalContainer
          isOpen={showPasswordModal}
          onClose={handleModalClose}
          onConfirmSuccess={handleVerificationSuccess}
          journalId={journalId}
          actionType={actionToPerform}
        />
      )}
    </section>
  );
};
