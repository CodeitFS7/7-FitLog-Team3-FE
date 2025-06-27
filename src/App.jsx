import { BrowserRouter, Routes, Route } from "react-router-dom";
import JournalsPost from "./pages/journalsPost";
import "./css/style.css";
import { MainPage } from "./pages/MainPage";
import { PATH } from "../utils/path.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/journals/post" element={<JournalsPost />} />
        <Route path={PATH.index()} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
