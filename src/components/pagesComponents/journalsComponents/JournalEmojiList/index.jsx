import { EmojiValueDisplay } from "../EmojiValueDisplay";
import styles from "./JournalEmojiList.module.css";
/**
 * 저널에 속한 이모지 목록을 표시하는 컴포넌트입니다.
 * 다양한 모드를 통해 표시 방식을 제어할 수 있습니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {Array<object>} props.emojis - 해당 저널의 모든 이모지 데이터 배열입니다. (백엔드로부터 옴)
 * @param {'top' | 'all' | 'rest'} [props.mode='top'] - 이모지 표시 모드입니다.
 * - 'top': 상위 `displayCount` 개수만 표시합니다. (기본값=3)
 * - 'all': 모든 이모지를 표시합니다.
 * - 'rest': 상위 `displayCount` 개수 이후의 나머지 이모지를 표시합니다.
 * @param {number} [props.displayCount=3] - 'top' 모드나 'rest' 모드에서 기준이 되는 이모지 갯수입니다. (기본값: 3)
 */
export const JournalEmojiList = ({
  emojis,
  mode = "top",
  displayCount = 3,
}) => {
  // 이모지가 없으면 아무것도 표시 안 함
  if (!emojis || emojis.length === 0) {
    return null;
  }

  let emojisToDisplay = [];

  switch (mode) {
    case "top": // 상위 N개
      emojisToDisplay = emojis.slice(0, displayCount);
      break;
    case "all": // 전체
      emojisToDisplay = emojis;
      break;
    case "rest": // 나머지 (displayCount 이후)
      emojisToDisplay = emojis.slice(displayCount);
      break;
    default: // 정의되지 않은 mode일 경우, 기본값인 'top' (3개)을 따르도록
      emojisToDisplay = emojis.slice(0, displayCount);
      break;
  }

  // 만약 rest 모드인데 남은 이모지가 없으면 아무것도 표시 안 함
  if (mode === "rest" && emojisToDisplay.length === 0) {
    return null;
  }
  return (
    <div className={styles.emojiValueDisplayContainer}>
      {emojisToDisplay.map((emoji) => (
        <EmojiValueDisplay
          key={emoji.id}
          emojiType={emoji.id}
          value={emoji.count}
        />
      ))}
    </div>
  );
};
