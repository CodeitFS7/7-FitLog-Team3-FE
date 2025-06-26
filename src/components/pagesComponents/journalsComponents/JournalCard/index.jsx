import { JournalEmojiList } from "../JournalEmojiList";
import { PointDisplay } from "../PointDisplay";
import styles from "./JournalCard.module.css";
/**
 * 저널 카드 컴포넌트입니다.
 * 저널의 기본 정보, 포인트, 이모지 목록을 표시합니다.
 * @param {'dark' | 'light'} [props.mode='light'] - 카드의 테마 모드입니다. (기본값: 'light')
 * - 'light': 글자색은 검정 계열입니다. (현재 시안의 기본 테마)
 * - 'dark': 글자색은 하얀 계열입니다.
 */
export const JournalCard = ({
  date,
  title,
  nickname,
  description,
  emojis,
  routinePoint,
  totalExercisePoint,
  mode = "light",
}) => {
  const stampEmoji = "🎯";
  const muscleEmoji = "💪";
  return (
    <section
      className={`${styles.journalCardContainer} ${
        mode === "dark" ? styles.darkMode : ""
      }`}
    >
      <div className={styles.contentContainer}>
        <div className={styles.topRightArea}>
          <p className={styles.date}>· {date}일째 진행 중</p>
          <div className={styles.pointDisplayContainer}>
            <PointDisplay
              emoji={stampEmoji}
              value={routinePoint}
              unit="개"
              mode={mode}
            />
            <PointDisplay
              emoji={muscleEmoji}
              value={totalExercisePoint}
              unit="p 득근"
              mode={mode}
            />
          </div>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.nicknameContainer}>
          ㅣ<span className={styles.nickname}>{nickname}</span>님의 운동일지
        </h3>
        <p className={styles.description}>{description}</p>
      </div>
      <JournalEmojiList emojis={emojis} mode="top" displayCount={3} />
    </section>
  );
};
