import styles from "./Message.module.css";

export const Message = ({ error, success }) => {
  if (error) return <div className={styles.errorMsg}>{error}</div>;
  if (success) return <div className={styles.successMsg}>{success}</div>;
  return null;
};
