import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JournalsPost } from "./pages/JournalsPost/index.jsx";
import { MainPage } from "./pages/MainPage/MainPage.jsx";
import { RoutinesDetail } from "./pages/RoutinesDetail/index.jsx";
import { JournalDetail } from "./pages/JournalDetail/index.jsx";
import { ExerciseLogs } from "./pages/ExerciseLogs.jsx";
import { UpdateJournal } from "./pages/UpdateJournal/index.jsx";
import { PATH } from "../utils/path.js";
import "./css/base.css";
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
        <Route
          path={PATH.journal.update(":journalId")}
          element={<UpdateJournal />}
        />
        <Route
          // RoutinesDetail 컴포넌트명 todayRoutines로 변경 검토
          path={PATH.journal.todayRoutines(":journalId")}
          element={<RoutinesDetail />}
        />
        <Route
          path={PATH.journal.exerciseLogs(":journalId")}
          element={<ExerciseLogs />}
        />
        <Route path="/routines/:journalId" element={<RoutinesDetail />} />
        <Route path="/exerciseLogs" element={<ExerciseLogs />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
