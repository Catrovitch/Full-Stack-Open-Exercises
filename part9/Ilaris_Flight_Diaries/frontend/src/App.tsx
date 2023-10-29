import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DiaryList from "./components/DiaryList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DiaryList />} />
      </Routes>
    </Router>
  );
}

export default App;
