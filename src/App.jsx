import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import JournalsPost from "./pages/journalsPost";
import "./css/style.css";
=======
import { MainPage } from "./pages/MainPage";
import { PATH } from "../utils/path.js";
>>>>>>> 8fbac44 (feat: 버튼 컴포넌트 초안)

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/journals/post" element={<JournalsPost />} />
=======
        <Route path={PATH.index()} element={<MainPage />} />
>>>>>>> 8fbac44 (feat: 버튼 컴포넌트 초안)
      </Routes>
    </BrowserRouter>
  );
}

export default App;
