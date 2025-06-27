import styles from "./Header.module.css";
import brandImg from "../../assets/images/brandLogo/LogoBlue.png";
export const JournalEmojiList = () => {
  return (
    <header>
      <div>
        <img src={brandImg} className={styles.brandImg} />
        <h1>Fit Log</h1>
      </div>
      <MakeButton></MakeButton>
    </header>
  );
};
