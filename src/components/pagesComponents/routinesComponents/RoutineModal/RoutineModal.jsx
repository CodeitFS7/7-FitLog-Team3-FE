import React from "react";
import styles from "./RoutineModal.module.css";
import { FaTrashAlt } from "react-icons/fa";
import plusIcon from "../../../../assets/icons/ic_plus.svg";
<<<<<<< HEAD
// import React, { useState } from "react";
// import "./routineModal.css";
// import plusIcon from "../../../assets/icons/ic_plus.svg";
// import trashIcon from "../../../assets/icons/btn_determinate.svg";

// const RoutineModal = ({ routines, setRoutines, onClose }) => {
//   const [newRoutine, setNewRoutine] = useState("");

//   const handleChange = (e) => {
//     setNewRoutine(e.target.value);
//   };

//   const handleAdd = () => {
//     const trimmed = newRoutine.trim();
//     if (!trimmed) return;

//     const newItem = {
//       routineId: Date.now(),
//       name: trimmed,
//     };

//     setRoutines([...routines, newItem]);
//     setNewRoutine("");
//   };

//   const handleDelete = (id) => {
//     setRoutines(routines.filter((routine) => routine.routineId !== id));
//   };

//   const handleSubmit = () => {
//     // 서버 통신 로직은 추후 구현 예정
//     onClose();
//   };
=======
>>>>>>> origin/main

const RoutineModal = ({
  routines,
  newRoutine,
  onChange,
<<<<<<< HEAD
  onAdd,
  onDelete,
  onClose,
  onSubmit,
}) => {
  //const RoutineModal = ({... 이 부분은 제가 임시로 작성한 부분입니다.
=======
  onDelete,
  onAdd,
  onClose,
  onSubmit,
}) => {
>>>>>>> origin/main
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
<<<<<<< HEAD
//     <div className="modal-overlay">
//       <div className="modal-routine-wrapper">
//         <div className="modal-container">
//           <h2 className="modal-title">루틴 목록</h2>

//           <ul className="modal-routine-list">
//             {routines.map((routine) => (
//               <li key={routine.routineId} className="modal-routine-item">
//                 <div className="modal-routine-input">
//                   <span className="modal-routine-name">{routine.name}</span>
//                 </div>
//                 <button
//                   className="modal-delete-button"
//                   onClick={() => handleDelete(routine.routineId)}
//                 >
//                   <img
//                     className="modal-delete-img"
//                     src={trashIcon}
//                     alt="삭제"
//                   />
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div className="modal-bottom">
//             <div className="modal-add-form">
//               <input
//                 className="modal-add-input"
//                 type="text"
//                 value={newRoutine}
//                 onChange={handleChange}
//                 placeholder="루틴을 입력하세요"
//               />
//               <button className="add-button" onClick={handleAdd}>
//                 <img src={plusIcon} alt="추가" />
//               </button>
//             </div>

//             <div className="modal-footer">
//               <button className="cancel-btn" onClick={onClose}>
//                 취소
//               </button>
//               <button className="submit-btn" onClick={handleSubmit}>
//                 수정 완료
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
=======
>>>>>>> origin/main

export default RoutineModal;
