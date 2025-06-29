import arrowIcon from "../../../assets/icons/ic_arrow_right.svg";
import styles from "./LinkButton.module.css";
import { Link } from "react-router-dom";

export const LinkButton = ({ children, to }) => {
  return (
    <Link to={to} className={styles.linkButton}>
      {children}
      <img src={arrowIcon} alt="오른쪽 화살표" className={styles.arrowIcon} />
    </Link>
  );
};
