import React, { useState, useEffect } from "react";
import styles from "./RoutineButton.module.css";

export const RoutineButton = ({
  id,
  children,
  isInitialCompleted,
  onClick,
}) => {
  const [isCompleted, setIsCompleted] = useState(isInitialCompleted);

  useEffect(() => {
    setIsCompleted(isInitialCompleted);
  }, [isInitialCompleted]);

  const handleClick = async () => {
    const newIsCompletedState = !isCompleted;
    setIsCompleted(newIsCompletedState);

    if (onClick) {
      await onClick(id, newIsCompletedState);
    }
  };

  const buttonClasses = isCompleted ? styles.isCompleted : styles.routineButton;

  return (
    <button className={buttonClasses} onClick={handleClick}>
      {children}
    </button>
  );
};
