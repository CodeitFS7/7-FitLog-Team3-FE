import { JournalEmojiList } from "../JournalEmojiList";
import { PointDisplay } from "../PointDisplay";
import styles from "./JournalCard.module.css";
import background0 from "../../../../assets/images/backgroundJournal/background0.png";
import background1 from "../../../../assets/images/backgroundJournal/background1.png";
import background2 from "../../../../assets/images/backgroundJournal/background2.png";
import background3 from "../../../../assets/images/backgroundJournal/background3.png";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../../utils/path.js";

const backgroundsData = [
  background0, // index 0: 사진
  background1, // index 1: 사진
  background2, // index 2: 사진
  background3, // index 3: 사진
  "#FCF4DD",
  "#DAEAF6",
  "#FCE1E4",
  "#DDEDEA",
];
export const JournalCard = ({ journal }) => {
  const {
    id: currentJournalId,
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

  const currentMode = background >= 0 && background <= 3 ? "dark" : "light"; // 0~3은 light, 4~7은 dark

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
      selectedBackground.endsWith(".png"))
  ) {
    dynamicBackgroundStyles.backgroundImage = `url(${selectedBackground})`;
    dynamicBackgroundStyles.backgroundSize = "cover";
    dynamicBackgroundStyles.backgroundPosition = "center";
    dynamicBackgroundStyles.backgroundRepeat = "no-repeat";
  }

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(PATH.journal.details(currentJournalId));
  };

  return (
    <section
      className={`${styles.journalCardContainer} ${
        currentMode === "dark" ? styles.darkMode : ""
      }`}
      style={dynamicBackgroundStyles}
      onClick={handleCardClick}
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
