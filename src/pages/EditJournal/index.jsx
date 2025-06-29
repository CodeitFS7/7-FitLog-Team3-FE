import React from "react";
import { useParams } from "react-router-dom";

export const EditJournal = () => {
  const { journalId } = useParams();
  return <p>{journalId}의 수정 페이지</p>;
};
