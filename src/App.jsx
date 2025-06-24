import { BrowserRouter, Routes, Route } from "react-router-dom";
import JournalsPost from "./pages/journalsPost";
import "./css/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/journals/post" element={<JournalsPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
