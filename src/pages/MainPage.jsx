import { JournalEmojiList } from "../components/pagesComponents/journalsComponents/JournalEmojiList";
import { PointDisplay } from "../components/pagesComponents/journalsComponents/PointDisplay";
import { JournalCard } from "../components/pagesComponents/journalsComponents/JournalCard";
import styles from "./MainPage.module.css";
export const MainPage = () => {
  const sampleEmojis = [
    { id: "👍", journalId: "journal1-id", count: 125 }, // 실제 DB id 필드
    { id: "🔥", journalId: "journal1-id", count: 98 },
    { id: "😂", journalId: "journal1-id", count: 70 },
    { id: "🤔", journalId: "journal1-id", count: 45 }, // limit=5일 때 보일 이모지
    { id: "💯", journalId: "journal1-id", count: 30 }, // limit=5일 때 보일 이모지
    { id: "🤍", journalId: "journal1-id", count: 15 }, // limit=5 초과
    { id: "😭", journalId: "journal1-id", count: 8 },
  ];
  return (
    <>
      <JournalEmojiList emojis={sampleEmojis} mode="all" />
      <div className={styles.container}>
        <PointDisplay emoji="🎯" value="27개" mode="light" />
        <PointDisplay emoji="💪" value="61p" unit="득근" mode="light" />
      </div>
      <JournalCard
        date="61"
        title="러닝 일지"
        nickname="nijuuy"
        description="매일 기록하는 운동일지매일 기록하는 운동일지"
        emojis={sampleEmojis}
        mode="light"
      />
      <JournalCard
        date="61"
        title="러닝 일지"
        nickname="nijuuy"
        description="매일 기록하는 운동일지매일 기록하는 운동일지"
        emojis={sampleEmojis}
        mode="dark"
      />
    </>
  );
};
