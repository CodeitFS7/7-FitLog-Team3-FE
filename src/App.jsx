import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import JournalsPost from "./pages/journalsPost";
import { MainPage } from "./pages/MainPage";
import RoutinesDetail from "./pages/routinesDetail";
import { PATH } from "../utils/path.js";
import "./css/style.css";
import "./css/reset.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.index()} element={<MainPage />} />
        <Route path="/journals/post" element={<JournalsPost />} />

        {/* 루트(/) 경로로 들어오면 기본 journalId로 이동 */}
        <Route path="/" element={<Navigate to="/journals/1" replace />} />

        {/* 루틴 상세 페이지 */}
        <Route path="/journals/:journalId" element={<RoutinesDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
