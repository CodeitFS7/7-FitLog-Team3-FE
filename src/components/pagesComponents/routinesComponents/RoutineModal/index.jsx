import { useEffect, useState } from "react";
import styles from "./RoutineModal.module.css";
import { FaTrashAlt } from "react-icons/fa";
import plusIcon from "../../../../assets/icons/ic_plus.svg";
import {
  getRoutinesByJournalId,
  createRoutine,
  deleteRoutine,
  updateRoutine,
} from "../../../../api/routines/routinesApi";

const RoutineModal = ({ journalId, onClose }) => {
  const [routines, setRoutines] = useState([]);
  const [newRoutineInputs, setNewRoutineInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedRoutines = await getRoutinesByJournalId(journalId);

        const processed = fetchedRoutines.map((routine) => ({
          id: routine.id || crypto.randomUUID(),
          title: routine.title,
        }));

        setRoutines(processed);
      } catch (err) {
        alert("루틴 목록 불러오기 실패: " + err.message);
        setError("루틴 목록 불러오기 실패: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [journalId]);

  const handleDelete = async (routineId) => {
    if (!window.confirm("정말로 이 습관을 삭제하시겠습니까?")) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await deleteRoutine(routineId, journalId);
      setRoutines((prev) => prev.filter((r) => r.id !== routineId));
    } catch (err) {
      alert("삭제 실패: " + err.message);
      setError("삭제 실패: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (id, newTitle) => {
    setRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, title: newTitle } : r))
    );
  };

  const handleUpdateRoutineOnBlur = async (routineId, currentTitle) => {
    const originalRoutine = routines.find((r) => r.id === routineId);
    if (!originalRoutine) return;

    const trimmedTitle = currentTitle.trim();

    if (!trimmedTitle) {
      alert("루틴 제목은 비워둘 수 없습니다. 원래 제목으로 복원됩니다.");
      setRoutines((prev) =>
        prev.map((r) =>
          r.id === routineId ? { ...r, title: originalRoutine.title } : r
        )
      );
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const updatedResult = await updateRoutine(routineId, trimmedTitle);
      setRoutines((prev) =>
        prev.map((r) => (r.id === routineId ? updatedResult : r))
      );
    } catch (err) {
      alert("수정 실패: " + err.message);
      setError("수정 실패: " + err.message);

      setRoutines((prev) =>
        prev.map((r) =>
          r.id === routineId ? { ...r, title: originalRoutine.title } : r
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddInput = () => {
    setNewRoutineInputs((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), title: "" },
    ]);
  };

  const handleNewInputChange = (id, value) => {
    setNewRoutineInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, title: value } : input
      )
    );
  };

  const handleNewDelete = (id) => {
    setNewRoutineInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const handleNewRoutineSubmit = async (id, title) => {
    if (!title.trim()) {
      handleNewDelete(id);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await createRoutine(journalId, { title: title.trim() });
      setRoutines((prev) => [...prev, result]);
      setNewRoutineInputs((prev) => prev.filter((input) => input.id !== id));
    } catch (err) {
      alert("추가 실패: " + err.message);
      setError("추가 실패: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (
    loading &&
    routines.length === 0 &&
    newRoutineInputs.length === 0 &&
    !error
  ) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <p className={styles.loadingMessage}>루틴을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && routines.length === 0 && newRoutineInputs.length === 0) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <p className={styles.errorMessage}>오류 발생: {error}</p>
          <button className={styles.modalCancel} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>습관 목록</h2>
        </div>

        <ul className={styles.modalRoutineList}>
          {routines.map((routine) => (
            <li key={routine.id} className={styles.modalRoutineItem}>
              <input
                className={styles.modalRoutineName}
                value={routine.title}
                onChange={(e) => handleTitleChange(routine.id, e.target.value)}
                onBlur={(e) =>
                  handleUpdateRoutineOnBlur(routine.id, e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
                }}
                disabled={loading}
              />
              <button
                className={styles.modalDeleteButton}
                onClick={() => handleDelete(routine.id)}
                disabled={loading}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}

          {newRoutineInputs.map((input) => (
            <li key={input.id} className={styles.modalRoutineItem}>
              <input
                className={styles.modalRoutineName}
                placeholder="새 루틴 입력"
                value={input.title}
                onChange={(e) => handleNewInputChange(input.id, e.target.value)}
                onBlur={() =>
                  input.title.trim() &&
                  handleNewRoutineSubmit(input.id, input.title)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
                }}
                disabled={loading}
              />
              <button
                className={styles.modalDeleteButton}
                onClick={() => handleNewDelete(input.id)}
                disabled={loading}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.modalFooter}>
          <button
            className={styles.modalAddButton}
            onClick={handleAddInput}
            disabled={loading} // 로딩 중에는 버튼 비활성화
          >
            <img src={plusIcon} alt="추가" />
          </button>
          <div className={styles.modalFooterButtons}>
            <button
              className={styles.modalConfirm}
              onClick={handleClose}
              disabled={loading} // 로딩 중에는 버튼 비활성화
            >
              수정 완료
            </button>
          </div>
        </div>
        {error && (routines.length > 0 || newRoutineInputs.length > 0) && (
          <p className={styles.inlineErrorMessage}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default RoutineModal;
