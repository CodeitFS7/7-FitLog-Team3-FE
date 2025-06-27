import React from "react";
import "../routinesComponents/routineModal.css";
import { FaTrashAlt } from "react-icons/fa";
import plusIcon from "../../../assets/icons/ic_plus.svg";

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
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">습관 목록</h2>
        </div>
        <ul className="modal-routine-list">
          {routines.map((routine) => (
            <li key={routine.routineId} className="modal-routine-item">
              <span className="modal-routine-name">{routine.name}</span>
              <button
                className="modal-delete-button"
                onClick={() => onDelete(routine.routineId)}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
          <li className="modal-input-item">
            <input
              type="text"
              value={newRoutine}
              onChange={onChange}
              placeholder="습관을 입력하세요"
              className="modal-input"
            />
            <button onClick={onAdd} className="modal-add-button">
              <img src={plusIcon} alt="추가" />
            </button>
          </li>
        </ul>
        <div className="modal-footer">
          <button className="modal-cancel" onClick={onClose}>
            취소
          </button>
          <button className="modal-confirm" onClick={onSubmit}>
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutineModal;
