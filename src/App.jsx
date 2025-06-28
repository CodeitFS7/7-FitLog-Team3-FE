import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import JournalsPost from "./pages/JournalsPost.jsx";
import { MainPage } from "./pages/MainPage/MainPage.jsx";
import RoutinesDetail from "./pages/RoutinesDetail.jsx";
import RoutinesHome from "./pages/routinesHome.jsx";
import { JournalDetail } from "./pages/JournalDetail/index.jsx";
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
          element={<JournalDetail />}
        />
        {/* 루틴 상세 페이지 */}
        <Route path="/routines/:journalId" element={<RoutinesDetail />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
