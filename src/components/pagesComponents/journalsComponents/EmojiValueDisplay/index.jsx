import styles from "./EmojiValueDisplay.module.css";
/**
 * @param {object} props - 컴포넌트 props
 * @param {string} props.emojiType - 데이터베이스에 저장된 이모지의 유니코드
 * @param {number} props.value - 데이터베이스에 저장된 이모지가 클릭된 수
 */

export const EmojiValueDisplay = ({ emojiType, value, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(emojiType);
    }
  };
  return (
    <div
      className={`${styles.emojiValueDisplayContainer} ${
        onClick ? styles.clickable : ""
      }`}
      onClick={handleClick}
    >
      <span className={styles.emoji} role="img" aria-label="이모지">
        {emojiType}
      </span>
      <p className={styles.value}>{value}</p>
    </div>
  );
};
