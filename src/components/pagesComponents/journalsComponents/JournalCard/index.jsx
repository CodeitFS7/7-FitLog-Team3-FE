import { JournalEmojiList } from "../JournalEmojiList";
import { PointDisplay } from "../PointDisplay";
import styles from "./JournalCard.module.css";
import background0 from "../../../../assets/images/backgroundJournal/background0.png";
import background1 from "../../../../assets/images/backgroundJournal/background1.png";
import background2 from "../../../../assets/images/backgroundJournal/background2.png";
import background3 from "../../../../assets/images/backgroundJournal/background3.png";

const backgroundsData = [
  background0, // index 0: 사진
  background1, // index 1: 사진
  background2, // index 2: 사진
  background3, // index 3: 사진
  "#FFEB3B", // index 4: 노란색 (예시 색상)
  "#E0F7FA", // index 5: 하늘색 (예시 색상)
  "#FFCCBC", // index 6: 살구색 (예시 색상)
  "#DCEDC8", // index 7: 연두색 (예시 색상)
];
export const JournalCard = ({ journal }) => {
  const {
    title,
    nickname,
    description,
    background,
    emoji,
    routinePoint,
    totalExercisePoint,
    createdAt,
  } = journal;

  const daysPassed =
    Math.floor((new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24)) + 1;

  const stampEmoji = "🎯";
  const muscleEmoji = "💪";

  const selectedBackground = backgroundsData[background]; // background prop (0-7)을 인덱스로 사용

  // ⭐⭐⭐ 2. background prop 값에 따라 'currentMode'를 계산합니다. ⭐⭐⭐
  const currentMode = background >= 0 && background <= 3 ? "dark" : "light"; // 0~3은 light, 4~7은 dark

  // ⭐⭐ 3. 동적으로 적용할 style 객체 생성 (배경 사진/색상) ⭐⭐
  const dynamicBackgroundStyles = {};
  if (
    typeof selectedBackground === "string" &&
    selectedBackground.startsWith("#")
  ) {
    dynamicBackgroundStyles.backgroundColor = selectedBackground;
  } else if (
    typeof selectedBackground === "string" &&
    (selectedBackground.startsWith("data:image/") ||
      selectedBackground.startsWith("/") ||
      selectedBackground.endsWith(".png") ||
      selectedBackground.endsWith(".jpg"))
  ) {
    dynamicBackgroundStyles.backgroundImage = `url(${selectedBackground})`;
    dynamicBackgroundStyles.backgroundSize = "cover";
    dynamicBackgroundStyles.backgroundPosition = "center";
    dynamicBackgroundStyles.backgroundRepeat = "no-repeat";
  }

  return (
    <section
      className={`${styles.journalCardContainer} ${
        currentMode === "dark" ? styles.darkMode : ""
      }`}
      style={dynamicBackgroundStyles}
    >
      <div className={styles.contentContainer}>
        <div className={styles.topRightArea}>
          <p className={styles.date}>· {daysPassed}일째 진행 중</p>
          <div className={styles.pointDisplayContainer}>
            <PointDisplay
              emoji={stampEmoji}
              value={routinePoint}
              unit="개"
              mode={currentMode}
            />
            <PointDisplay
              emoji={muscleEmoji}
              value={totalExercisePoint}
              unit="p 득근"
              mode={currentMode}
            />
          </div>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.nicknameContainer}>
          ㅣ<span className={styles.nickname}>{nickname}</span>님의 운동일지
        </h3>
        <p className={styles.description}>{description}</p>
      </div>
      <JournalEmojiList emojis={emoji} mode="top" displayCount={3} />
    </section>
  );
};
