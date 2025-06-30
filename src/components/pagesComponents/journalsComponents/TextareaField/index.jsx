import styles from "./TextareaField.module.css";
export const TextareaField = ({ label, ...props }) => {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.label}>{label}</div>
      <textarea className={styles.textarea} {...props} />
    </div>
  );
};
