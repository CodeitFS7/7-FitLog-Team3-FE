import React, { useState, useEffect, useCallback, useRef } from "react";
import { JournalEmojiList } from "../../journalsComponents/JournalEmojiList";
import { RestEmojisModal } from "../RestEmojisModal/index.jsx";
import styles from "./JournalEmojiManagement.module.css";

import { postEmojiByJournalId } from "../../../../api/journals/journalsApi.js";

import { createPopup } from "@picmo/popup-picker";
import "@picmo/popup-picker/dist/index.css";

export const JournalEmojiManagement = ({
  journalId,
  emoji,
  onEmojiDataUpdated,
}) => {
  const [showAllEmojisModal, setShowAllEmojisModal] = useState(false);
  const emojiButtonRef = useRef(null);
  const restEmojiButtonRef = useRef(null); // 추가
  const pickerInstance = useRef(null);

  const handleEmojiAction = useCallback(
    async (selection) => {
      const emoji =
        typeof selection === "string" ? selection : selection?.emoji;

      if (!emoji) {
        console.warn("잘못된 이모지 선택값:", selection);
        return;
      }

      try {
        await postEmojiByJournalId(journalId, emoji);
        onEmojiDataUpdated();
      } catch {
        alert("이모지 업데이트 실패!");
      }
    },
    [journalId, onEmojiDataUpdated]
  );

  useEffect(() => {
    if (!emojiButtonRef.current) return;

    const picker = createPopup(
      {},
      {
        referenceElement: emojiButtonRef.current,
        triggerElement: emojiButtonRef.current,
        position: "bottom-start",
        hideOnEmojiSelect: true,
      }
    );
    picker.addEventListener("emoji:select", handleEmojiAction);
    pickerInstance.current = picker;

    return () => {
      picker.removeEventListener("emoji:select", handleEmojiAction);
      picker.close?.();
    };
  }, [handleEmojiAction]);

  const handleAddEmojiClick = () => {
    pickerInstance.current?.open();
  };

  return (
    <div className={styles.emojiSectionContainer}>
      <JournalEmojiList
        emojis={emoji}
        mode="top"
        displayCount={3}
        onEmojiClick={handleEmojiAction}
      />
      {emoji.length > 3 && (
        <button
          className={styles.restEmojiButton}
          ref={restEmojiButtonRef} // ref 연결
          onClick={() => setShowAllEmojisModal(true)}
        >
          +{emoji.length - 3}..
        </button>
      )}
      <button
        className={styles.postEmoji}
        ref={emojiButtonRef}
        onClick={handleAddEmojiClick}
      >
        😊 추가
      </button>
      {showAllEmojisModal && (
        <RestEmojisModal
          emojis={emoji}
          onClose={() => setShowAllEmojisModal(false)}
          displayCount={3}
          onClick={handleEmojiAction}
          anchorRef={restEmojiButtonRef} // 전달
        />
      )}
    </div>
  );
};
