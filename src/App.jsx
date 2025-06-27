import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import JournalsPost from "./pages/journalsPost";
import { MainPage } from "./pages/MainPage";
import RoutinesDetail from "./pages/routinesDetail";
import { Routine } from "./pages/Routine.jsx";
import { PATH } from "../utils/path.js";
import "./css/style.css";
import "./css/reset.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.index()} element={<MainPage />} />
        <Route path={PATH.journal.create()} element={<JournalsPost />} />
        <Route
          path={PATH.journal.details(":journalId")}
          element={<Routine />}
        />
        {/* 루틴 상세 페이지 */}
        <Route path="/routines/:journalId" element={<RoutinesDetail />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
