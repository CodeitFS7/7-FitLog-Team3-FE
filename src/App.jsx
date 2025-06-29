import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import JournalsPost from "./pages/JournalsPost/JournalsPost.jsx";
import { MainPage } from "./pages/MainPage/MainPage.jsx";
import RoutinesDetail from "./pages/RoutinesDetail.jsx";
import { JournalDetail } from "./pages/JournalDetail/index.jsx";
import { ExerciseLogs } from "./pages/ExerciseLogs.jsx";
import { PATH } from "../utils/path.js";
import "./css/style.css";
import "./css/reset.css";
import { EditJournal } from "./pages/EditJournal/index.jsx";

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
          path={PATH.journal.edit(":journalId")}
          element={<EditJournal />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
