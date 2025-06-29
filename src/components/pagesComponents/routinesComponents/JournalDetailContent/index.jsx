import { RoutinesTable } from "../RoutinesTable/index.jsx";
import { JournalEmojiManagement } from "../../routinesComponents/JournalEmojiManagement/index.jsx";
import { PointDisplay } from "../../journalsComponents/PointDisplay/index.jsx";
import { getJournalByJournalId } from "../../../../api/journals/journalsApi.js";
import { useState, useEffect, useCallback } from "react";
import styles from "./JournalDetailContent.module.css";
import { getExercisePointByJournalId } from "../../../../api/exerciseLogs/exerciseLogsApi.js";
import { LinkButton } from "../../../commonComponents/LinkButton/index.jsx";
import { PATH } from "../../../../../utils/path.js";

export const JournalDetailContent = ({ journalId }) => {
  const [journal, setJournal] = useState(null); // 저널 상세 정보
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [totalExercisePoint, setTotalExercisePoint] = useState(0);

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
      setTotalExercisePoint(sumPoint); // 상태 업데이트
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

  if (loading) return <p>저널 정보 로딩 중...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;
  if (!journal) return <p>저널 정보를 찾을 수 없습니다.</p>;

  const {
    title,
    nickname,
    description,
    emoji, // 이모지 배열
    routinePoint,
  } = journal;

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
            <span className={styles.utilityLink}>공유하기</span>
            <span className={styles.utilitySeparator}> | </span>
            <span className={styles.utilityLink}>수정하기</span>
            <span className={styles.utilitySeparator}> | </span>
            <span className={styles.utilityLinkdelete}>스터디 삭제하기</span>
          </div>
          <div className={styles.actionLinkButton}>
            <LinkButton
              className={styles.actionButton}
              to={PATH.journal.todayRoutines(journalId)}
            >
              오늘의 루틴
            </LinkButton>
            <LinkButton
              className={styles.actionButton}
              to={PATH.journal.exerciseLogs(journalId)}
            >
              오늘의 운동
            </LinkButton>
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
    </section>
  );
};
