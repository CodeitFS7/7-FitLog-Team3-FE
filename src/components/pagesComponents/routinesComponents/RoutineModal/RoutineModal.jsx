import React from "react";
import styles from "./RoutineModal.module.css";
import { FaTrashAlt } from "react-icons/fa";
import plusIcon from "../../../../assets/icons/ic_plus.svg";

const RoutineModal = ({
  routines,
  newRoutine,
  onChange,
  onDelete,
  onAdd,
  onClose,
  onSubmit,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>습관 목록</h2>
        </div>
        <ul className={styles.modalRoutineList}>
          {routines.map((routine) => (
            <li key={routine.routineId} className={styles.modalRoutineItem}>
              <span className={styles.modalRoutineName}>{routine.name}</span>
              <button
                className={styles.modalDeleteButton}
                onClick={() => onDelete(routine.routineId)}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
          <li className={styles.modalInputItem}>
            <input
              type="text"
              value={newRoutine}
              onChange={onChange}
              placeholder="습관을 입력하세요"
              className="modal-input"
            />
            <button onClick={onAdd} className={styles.modalAddButton}>
              <img src={plusIcon} alt="추가" />
            </button>
          </li>
        </ul>
        <div className={styles.modalFooter}>
          <button className={styles.modalCancel} onClick={onClose}>
            취소
          </button>
          <button className={styles.modalConfirm} onClick={onSubmit}>
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutineModal;
