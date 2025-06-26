import { JournalEmojiList } from "../components/pagesComponents/journalsComponents/JournalEmojiList";

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
  return <JournalEmojiList emojis={sampleEmojis} mode="all" />;
};
