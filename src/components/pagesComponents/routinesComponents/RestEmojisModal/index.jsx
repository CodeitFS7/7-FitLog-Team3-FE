import React, { useEffect, useRef, useState } from "react";
import styles from "./RestEmojisModal.module.css";
import { JournalEmojiList } from "../../journalsComponents/JournalEmojiList";

/**
 * '더보기' 버튼 클릭 시 남은 이모지들을 표시하는 모달 컴포넌트입니다.
 * @param {object} props
 * @param {Array<object>} props.emojis
 * @param {function} props.onClose
 * @param {number} [props.displayCount=3]
 * @param {function} props.onClick
 * @param {object} props.anchorRef
 */
export const RestEmojisModal = ({
  emojis,
  onClose,
  displayCount = 3,
  onClick,
  anchorRef,
}) => {
  const modalRef = useRef(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (!modalRef.current || !anchorRef?.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();

    setStyle({
      position: "absolute",
      top: `${anchorRect.top + window.scrollY - 10}px`, // 버튼 위쪽 (조정 가능)
      left: `${anchorRect.left + window.scrollX}px`,
      zIndex: 1000,
    });
  }, [anchorRef]);

  return (
    <div className={styles.modalPortalContainer}>
      <div
        ref={modalRef}
        className={styles.modalContent}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        <JournalEmojiList
          emojis={emojis}
          mode="rest"
          displayCount={displayCount}
          onEmojiClick={onClick}
        />
        <button onClick={onClose} className={styles.closeModalButton}>
          닫기
        </button>
      </div>
    </div>
  );
};
