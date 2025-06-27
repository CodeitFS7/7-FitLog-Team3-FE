import styles from "./Header.module.css";
import brandImg from "../../../assets/images/brandLogo/LogoBlue.png";
import { MakeButton } from "../MakeButton";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../utils/path.js";
/**
 * 중요: 이 헤더는 CSS에 `position: fixed;`가 적용되어 문서 흐름에서 벗어나므로,
 * 이 헤더 바로 아래에 오는 페이지의 주요 콘텐츠는 헤더의 높이만큼
 * `padding-top` 또는 `margin-top` 94px을 주어야 헤더에 가려지지 않습니다.
 */
export const Header = () => {
  const navigate = useNavigate();

  const handleCreateJournalClick = () => {
    navigate(PATH.journal.create());
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.brandLogoContainer}>
        <img src={brandImg} className={styles.brandImg} />
        <h1 className={styles.logo}>Fit Log</h1>
      </div>
      <MakeButton onClick={handleCreateJournalClick}>
        운동일지 만들기
      </MakeButton>
    </header>
  );
};
