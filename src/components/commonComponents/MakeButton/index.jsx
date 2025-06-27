import styles from "./MakeButton.module.css";

/**
 * @param {object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 버튼 내부에 표시될 내용
 * @param {'large' | 'medium' | 'small' | 'xsmall'} [props.size='medium'] - 버튼 크기
 * @param {'brand' | 'white' } [props.color='brand'] - 버튼 색상
 */

export const MakeButton = ({
  children,
  size = "medium",
  color = "brand",
  onClick,
}) => {
  const sizeClass = styles[size];
  const colorClass = styles[color];
  return (
    <button
      className={`${styles.btn} ${sizeClass} ${colorClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
